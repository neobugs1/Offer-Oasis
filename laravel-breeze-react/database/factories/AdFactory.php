<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Ad;
use App\Models\AdImage;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ad>
 */
class AdFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageCount = rand(1, 5);

        $adData = [
            'title' => fake()->sentence(),
            'description' => fake()->realText(),
            'category' => Category::where('name', 'Lenovo')->first()->id,
            'seller' => User::find(1)->id,
            'price' => 1000,
            'currency' => fake()->currencyCode(),
            'start_price' => fake()->randomFloat(2, 1, 500) ?? null,
            'condition' => fake()->sentence(),
            'brand' => fake()->sentence(),
            'model' => fake()->sentence(),
            'features' => fake()->sentence(),
            'date_posted' => fake()->dateTimeBetween('now', '+1 year'),
            'view_count' => 1,
            'favorite_count' => 1,
            'status' => 'pending'
        ];

        // Create ad instance
        $ad = Ad::create($adData);

        // Generate ad images
        $images = [];
        for ($i = 0; $i < $imageCount; $i++) {
            $images[] = [
                'ad_id' => $ad->id,
                'url' => fake()->imageUrl(),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Create ad images
        AdImage::insert($images);

        return $adData;
    }
}
