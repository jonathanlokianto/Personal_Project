<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Agenda extends Model
{
    /** @use HasFactory<\Database\Factories\AgendaFactory> */
    use HasFactory;

    protected $fillable = [
        'content',
        'note',
        'progress',
        'completed_at',
        'isSuspended'
    ];

    /**
     * @return array<string, string>
     */

    protected function casts(): array
    {
        return [
            // 'id' => 'integer',
            'content' => 'string',
            'note' => 'string',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'completed_at' => 'datetime',
            'progress' => 'integer',
            'isSuspended'=>'boolean',
        ];
        // return parent::casts();
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }
}
