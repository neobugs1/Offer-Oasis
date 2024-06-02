<?php

namespace App\Http\Resources;

use App\Models\AdImage;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use phpDocumentor\Reflection\PseudoTypes\List_;

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

            'brand' => $this->brand,
            'model' => $this->model,
            'year' => $this->year,
            'fuel_type' => $this->fuel_type,
            'mileage' => $this->mileage,
            'transmission' => $this->transmission,
            'body_type' => $this->body_type,
            'color' => $this->color,
            'registration_country' => $this->registration_country,
            'registration_valid_until' => $this->registration_valid_until,
            'engine_power_ks' => $this->engine_power_ks,
            'emission_class' => $this->emission_class,

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
