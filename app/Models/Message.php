<?php

namespace App\Models;

use App\MessageRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'role',
        'message_content'
    ];

    /**
     * @return array<string, string>
     */

    use HasFactory;

    protected function casts(): array {       
        return [
            'role' => MessageRole::class,
        ];}

}
