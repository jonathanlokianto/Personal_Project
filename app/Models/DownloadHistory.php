<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DownloadHistory extends Model
{
    protected $table = 'download_histories';
    /**
     * @return array<string, string>
     */

    protected $fillable = [
        'download_url',
        'download_title',
        'download_thumbnail',
    ];
}
