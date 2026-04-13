<?php

namespace Database\Factories;

use App\Models\Model;
use App\MessageRole;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Model>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */



    public function definition(): array
    {
        return [
            'role'=>fake()->randomElement(MessageRole::cases()),
            'message_content' => fake()->sentence(rand(2,10)),
        ];
    }
}
