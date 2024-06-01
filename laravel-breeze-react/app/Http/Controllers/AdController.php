<?php

namespace App\Http\Controllers;

use App\Http\Resources\AdResource;
use App\Models\Ad;
use App\Http\Requests\StoreAdRequest;
use App\Http\Requests\UpdateAdRequest;
use App\Models\AdImage;
use App\Models\Category;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
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
        $query = Ad::where('status', 'approved');
        $ads = $query->paginate(5)->onEachSide(1);
        $categories = Category::whereNull('parent_id')->with([
            'children' => function ($query) {
                $query->with('children');
            }
        ])->get();

        return inertia('Search', [
            'ads' => AdResource::collection($ads)->response()->getData(true),
            'categories' => $categories,
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
            "start_price" => request()->get('start_price'),
            "currency" => "MKD",
            "condition" => request()->get('condition'),
            "brand" => request()->get('brand'),
            "model" => request()->get('model'),
            "features" => request()->get('features'),
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
                $filename = time() . '.jpg';

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
        // return response()->json(['message' => 'Ad created successfully', 'ad' => $ad], 201);
        return to_route('ad.show', $ad->id)->with('success', 'Ad created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Ad $ad)
    {
        return inertia('Ad/Show', [
            'ad' => new AdResource($ad),
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

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdRequest $request, Ad $ad)
    {
        $this->authorize('update', $ad);

        $data = $request->all(); // Get all raw data from the request
        $data['updated_by'] = auth()->id();
        $data['status'] = 'pending';
        // Handle images if present
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Create new manager instance with desired driver
                $manager = new ImageManager(new Driver());

                // Read image from filesystem
                $img = $manager->read($image);

                // Resize the image to a width of 400 and constrain aspect ratio (auto height)
                $img->scale(width: 640);

                // Generate a filename with .jpg extension
                $filename = time() . '.jpg';

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
        $ad->update($data);

        return redirect()->route('ad.show', $ad->id)->with("success", "Ad updated successfully");
    }

    public function approve(UpdateAdRequest $request, Ad $ad)
    {
        $this->authorize('update', $ad);

        $data['status'] = "approved";

        $ad->update($data);

        return redirect()->route('reviews', $ad->id)->with("success", "Ad approved successfully");
    }

    public function reject(UpdateAdRequest $request, Ad $ad)
    {
        $this->authorize('update', $ad);

        $data['status'] = "rejected";

        $ad->update($data);

        return redirect()->route('reviews', $ad->id)->with("success", "Ad rejected successfully");
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
        return to_route('search')->with("success", "Ad deleted successfully");
    }
}