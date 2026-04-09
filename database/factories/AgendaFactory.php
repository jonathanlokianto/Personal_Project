<?php

namespace Database\Factories;

use App\Models\Agenda;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends Factory<Agenda>
 */
class AgendaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content'=>fake()->sentence(5),
            'note'=>fake()->paragraph(),
            'created_at' => now(),
            'updated_at' => now(),
            'progress'=>fake()->numberBetween(0,100),
            'isSuspended'=>fake()->boolean(),
        ];
    }
}
