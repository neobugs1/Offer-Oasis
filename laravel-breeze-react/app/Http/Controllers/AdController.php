<?php

namespace App\Http\Controllers;

use App\Http\Resources\AdResource;
use App\Models\Ad;
use App\Http\Requests\StoreAdRequest;
use App\Http\Requests\UpdateAdRequest;
use App\Models\AdImage;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;



class AdController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        function getChildIds($parentId, $table)
        {
            $childIds = DB::table($table)->where('parent_id', $parentId)->pluck('id')->toArray();

            foreach ($childIds as $childId) {
                $childIds = array_merge($childIds, getChildIds($childId, $table));
            }

            return $childIds;
        }

        $query = Ad::where('status', 'approved')
            ->join('users', 'ads.seller', '=', 'users.id')
            ->select('ads.*', 'users.location');

        if (request('searchTerm')) {
            $searchTerm = '%' . request('searchTerm') . '%';
            $query->where(function ($subQuery) use ($searchTerm) {
                $subQuery->where('title', 'ILIKE', $searchTerm)
                    ->orWhere('description', 'ILIKE', $searchTerm)
                    ->orWhere('brand', 'ILIKE', $searchTerm)
                    ->orWhere('model', 'ILIKE', $searchTerm)
                    ->orWhere('fuel_type', 'ILIKE', $searchTerm)
                    ->orWhere('transmission', 'ILIKE', $searchTerm)
                    ->orWhere('body_type', 'ILIKE', $searchTerm)
                    ->orWhere('color', 'ILIKE', $searchTerm)
                    ->orWhere('registration_country', 'ILIKE', $searchTerm)
                    ->orWhere('emission_class', 'ILIKE', $searchTerm)
                    ->orWhere('status', 'ILIKE', $searchTerm);
            });
        }
        if (request('category')) {
            $categoryIds = array_merge([request('category')], getChildIds(request('category'), 'categories'));
            $query->whereIn('category', $categoryIds);
        }
        if (request('location')) {
            $locationIds = array_merge([request('location')], getChildIds(request('location'), 'locations'));
            $query->whereIn('location', $locationIds);
        }

        // Filter
        if (request('brand')) {
            $query->where('brand', request('brand'));
        }
        if (request('model')) {
            $query->where('model', request('model'));
        }
        if (request('fuel_type')) {
            $query->where('fuel_type', request('fuel_type'));
        }
        if (request('price_from')) {
            $query->where('price', '>=', request('price_from'));
        }
        if (request('price_to')) {
            $query->where('price', '<=', request('price_to'));
        }
        if (request('year_from')) {
            $query->where('year', '>=', request('year_from'));
        }
        if (request('year_to')) {
            $query->where('year', '<=', request('year_to'));
        }
        if (request('km_from')) {
            $query->where('mileage', '>=', request('km_from'));
        }
        if (request('km_to')) {
            $query->where('mileage', '<=', request('km_to'));
        }
        if (request('kw_from')) {
            $query->where('engine_power_ks', '>=', request('kw_from'));
        }
        if (request('kw_to')) {
            $query->where('engine_power_ks', '<=', request('kw_to'));
        }
        // END FILTER

        if (request('sort') === 'price') {
            $query->orderBy('price');
        } else {
            $query->orderBy('date_posted', 'desc');
        }

        $ads = $query->paginate(5)->onEachSide(1);
        $categories = Category::whereNull('parent_id')->with([
            'children' => function ($query) {
                $query->with('children');
            }
        ])->get();
        $locations = Location::whereNull('parent_id')->with([
            'children' => function ($query) {
                $query->with('children');
            }
        ])->get();

        $mostPopularAds = Ad::where('status', 'approved')
            ->orderBy('view_count', 'desc')
            ->take(5)
            ->get();


        return inertia('Search', [
            'ads' => AdResource::collection($ads)->response()->getData(true),
            'mostPopularAds' => AdResource::collection($mostPopularAds)->response()->getData(true),
            'categories' => $categories,
            'locations' => $locations,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::whereNull('parent_id')->with([
            'children' => function ($query) {
                $query->with('children');
            }
        ])->get();
        return Inertia::render('Ad/Form', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdRequest $request)
    {
        $ad = Ad::create([
            "title" => request()->get('title'),
            "description" => request()->get('description'),
            "category" => request()->get('category'),
            "price" => request()->get('price'),
            "start_price" => request()->get('price'),
            "currency" => request()->get('currency'),

            'brand' => request()->get('brand'),
            'model' => request()->get('model'),
            'year' => request()->get('year'),
            'fuel_type' => request()->get('fuel_type'),
            'mileage' => request()->get('mileage'),
            'transmission' => request()->get('transmission'),
            'body_type' => request()->get('body_type'),
            'color' => request()->get('color'),
            'registration_country' => request()->get('registration_country'),
            'registration_valid_until' => request()->get('registration_valid_until'),
            'engine_power_ks' => request()->get('engine_power_ks'),
            'emission_class' => request()->get('emission_class'),


            "seller" => auth()->id(),
            "date_posted" => now()
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Create new manager instance with desired driver
                $manager = new ImageManager(new Driver());

                // Read image from filesystem
                $img = $manager->read($image);

                // Resize the image to a width of 400 and constrain aspect ratio (auto height)
                $img->scale(width: 640);

                // Generate a filename with .jpg extension
                $filename = time() . uniqid() . '.jpg';

                // Compress the image and save it with .jpg extension
                $img->save(public_path('storage\\ads\\' . $filename), 60);

                // Store the image with .jpg extension
                $path = 'ads/' . $filename;

                AdImage::create([
                    'ad_id' => $ad->id,
                    'url' => Storage::url($path),
                ]);
            }
        }
        return to_route('oglasi', $ad->id)->with(['success' => 'Огласот е успешно креиран!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ad $ad)
    {
        $ad->increment('view_count');

        return inertia('Ad/Show', [
            'ad' => new AdResource($ad->fresh()),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ad $ad)
    {
        $this->authorize('edit', $ad);

        $categories = Category::whereNull('parent_id')->with([
            'children' => function ($query) {
                $query->with('children');
            }
        ])->get();
        return inertia('Ad/Edit', [
            'ad' => new AdResource($ad),
            'categories' => $categories,
        ]);
    }

    public function renew(UpdateAdRequest $request, Ad $ad)
    {
        $this->authorize('update', $ad);

        $data['date_posted'] = now();

        $ad->update($data);

        return redirect()->back()->with([
            'success' =>
                'Огласот е успешно обновен!',
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdRequest $request, Ad $ad)
    {
        $this->authorize('update', $ad);

        // Collect incoming image IDs
        $incomingImageIds = collect($request->input('images'))->pluck('id')->filter()->toArray();

        // Find images to delete
        $imagesToDelete = $ad->images()->whereNotIn('id', $incomingImageIds)->get();

        // Delete specific images
        foreach ($imagesToDelete as $image) {
            $filePath = str_replace(Storage::url(''), '', $image->url);
            Storage::disk('public')->delete($filePath);
            $image->delete();
        }

        // Add new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $manager = new ImageManager(new Driver());
                $img = $manager->read($image);
                $img->scale(width: 640);

                $filename = time() . uniqid() . '.jpg';
                $img->save(public_path('storage/ads/' . $filename), 60);

                $path = 'ads/' . $filename;

                AdImage::create([
                    'ad_id' => $ad->id,
                    'url' => Storage::url($path),
                ]);
            }
        }

        $data = $request->except(['images', 'imagesToDelete']);
        $data['updated_by'] = auth()->id();
        $data['status'] = 'pending';
        $ad->update($data);

        return redirect()->route("oglasi")->with([
            "success" => "Огласот е успешно променет!"
        ]);
    }



    public function approve(UpdateAdRequest $request, Ad $ad)
    {
        $this->authorize('update', $ad);

        $data['status'] = "approved";
        $data['date_posted'] = now();

        $ad->update($data);


        return redirect()->back()->with(["success" => "Огласот е успешно одобрен!"]);
    }

    public function reject(UpdateAdRequest $request, Ad $ad)
    {
        $this->authorize('update', $ad);

        $data['status'] = "rejected";
        $data['date_posted'] = now();

        $ad->update($data);

        return redirect()->back()->with(["success" => "Огласот е успешно одбиен!"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ad $ad)
    {
        $this->authorize('delete', $ad);

        if ($ad->images != null) {
            foreach ($ad->images as $image) {
                // Get the relative file path
                $filePath = str_replace(Storage::url(''), '', $image->url);
                // Delete the file
                Storage::disk('public')->delete($filePath);
                $image->delete();
            }
        }
        $ad->delete();
        return redirect()->back()->with([
            "success" => "Огласот е успешно избришан!"
        ]);
    }
}