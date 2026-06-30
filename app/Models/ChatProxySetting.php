<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatProxySetting extends Model
{
    use HasFactory;
    protected $fillable = [
        'preset_name',
        'model_name',
        'model_proxy_url',
        'model_api_key',
        'model_custom_prompt',
    ];


        /**
     * @return array<string, string>
     */

        protected function casts(): array
        {
            return [
                'preset_name'         => 'string',
                'model_name'          => 'string',
                'model_proxy_url'     => 'string',
                'model_api_key'       => 'encrypted',
                'model_custom_prompt' => 'string',
                'preset_isActive'     => 'boolean',
                'preset_isDefault'    => 'boolean'
            ];
        }
}
