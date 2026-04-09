<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'tag_name'
    ];

    protected function casts(): array
    {
        return [
            'tag_name' => 'string',

        ];
    }


    public function agendas(): BelongsToMany
    {
        return $this->belongsToMany(Agenda::class);
    }
}