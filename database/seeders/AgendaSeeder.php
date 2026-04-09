<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgendaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = \App\Models\Tag::factory(5)->create();
        \App\Models\Agenda::factory(3)->create()->each(
            function ($agenda) use ($tags) {
                $agenda->tags()->sync(
                    $tags->random(rand(1,3))->pluck('id')->toArray()
                );
            }
        );
    }
}
