<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

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
        return [
            'title' => fake()->sentence(),
            'description' => fake()->realText(),
            'category' => Category::where('name', 'Lenovo')->first()->id,
            'seller' => User::find(1)->id,
            'price' => 1000,
            'currency' => fake()->currencyCode(),
            'start_price' => fake()->randomFloat(2, 1, 500) ?? null,
            'images' => fake()->imageUrl(),
            'condition' => fake()->sentence(),
            'brand' => fake()->sentence(),
            'model' => fake()->sentence(),
            'features' => fake()->sentence(),
            'date_posted' => fake()->dateTimeBetween('now', '+1 year'),
            'view_count' => 1,
            'favorite_count' => 1,
            'status' => 'pending'
        ];
    }
}
