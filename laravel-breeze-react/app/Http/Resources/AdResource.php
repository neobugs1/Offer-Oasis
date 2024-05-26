<?php

namespace App\Http\Resources;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Models\User;

class AdResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->getCategoriesRecursive(Category::find($this->category)),
            'seller' => new UserResource(User::find($this->seller)),
            'price' => $this->price,
            'currency' => $this->currency,
            'start_price' => $this->start_price,
            'images' => $this->images,
            'condition' => $this->condition,
            'brand' => $this->brand,
            'model' => $this->model,
            'features' => $this->features,
            'date_posted' => $this->date_posted,
            'view_count' => $this->view_count,
            'favorite_count' => $this->favorite_count,
            'status' => $this->status,
        ];
    }
    protected function getCategoriesRecursive($category)
    {
        $categories = [];

        // Traverse up the category tree until the parent is null
        while ($category) {
            $categories[] = [
                'id' => $category->id,
                'name' => $category->name,
                // Add other category attributes if needed
            ];
            $category = $category->parent;
        }

        // Reverse the array to maintain hierarchy order
        return array_reverse($categories);
    }
}
