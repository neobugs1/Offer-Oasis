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
        $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'category' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'start_price' => 'required|numeric',
            'condition' => 'required',
            'brand' => 'nullable',
            'model' => 'nullable',
            'features' => 'nullable',
            'images' => 'nullable',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $ad = new Ad;
        $ad->title = $request->title;
        $ad->description = $request->description;
        $ad->category_id = $request->category;
        $ad->price = $request->price;
        $ad->start_price = $request->start_price;
        $ad->condition = $request->condition;
        $ad->brand = $request->brand;
        $ad->model = $request->model;
        $ad->features = $request->features;
        $ad->seller_id = auth()->id(); // or any logic to assign the seller
        $ad->date_posted = now();
        $ad->save();

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('public/ads');
                AdImage::create([
                    'ad_id' => $ad->id,
                    'url' => Storage::url($path),
                ]);
            }
        }

        return response()->json(['message' => 'Ad created successfully', 'ad' => $ad], 201);
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
        //
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
        //
    }
}
