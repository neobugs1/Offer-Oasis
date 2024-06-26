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
        $adData = [
            'title' => fake()->sentence(),
            'description' => fake()->realText(),
            'category' => fake()->numberBetween(1, 20),
            'seller' => fake()->numberBetween(1, 11),
            'price' => fake()->randomNumber(4, false),
            'currency' => fake()->randomElement(['MKD', 'EUR']),
            'start_price' => 4500,

            'brand' => fake()->word(),
            'model' => fake()->word(),

            'date_posted' => fake()->dateTimeBetween('-1 year', 'now'),
            'view_count' => 1,
            'status' => 'pending'
        ];

        return $adData;
    }

    public function configure()
    {
        return $this->afterCreating(function (Ad $ad) {
            $imageCount = rand(1, 5);

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
        });
    }
}
