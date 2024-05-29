<?php

namespace App\Http\Controllers;

use App\Http\Resources\AdResource;
use App\Models\Ad;
use App\Http\Requests\StoreAdRequest;
use App\Http\Requests\UpdateAdRequest;
use App\Models\AdImage;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Ad::query();
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
                $path = $image->store('public/ads');
                AdImage::create([
                    'ad_id' => $ad->id,
                    'url' => Storage::url($path),
                ]);
            }
        }

        // return response()->json(['message' => 'Ad created successfully', 'ad' => $ad], 201);
        return to_route('ad.show', $ad->id);
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
        return inertia('Ad/Edit', [
            'ad' => new AdResource($ad),
        ])
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdRequest $request, Ad $ad)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ad $ad)
    {
        $ad->delete();
        return to_route('search')->("success", "Ad deleted successfully");
    }
}
