<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ad_id' => 1,
            'reviewer_id' => 1,
            'status' => fake()->randomElement(['pending', 'approved', 'rejected']),
            'comments' => fake()->sentence(),
            'reviewed_at' => fake()->dateTimeBetween('now', '+1 year'),
        ];
    }
}
