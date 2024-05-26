<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdResource extends JsonResource
{
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
            'category' => $this->category,
            'seller_id' => $this->seller_id,
            'seller_name' => $this->seller_name,
            'seller_rating' => $this->seller_rating,
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
}
