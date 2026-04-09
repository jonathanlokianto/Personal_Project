<?php

namespace Database\Factories;

// use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<tags>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tag_name'=>fake()->words(fake()->numberBetween(1,2),true)
        ];
    }
}