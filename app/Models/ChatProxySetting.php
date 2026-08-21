<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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


        public function setActive(){
            DB::transaction(function () {
            // ChatProxySetting::query()->update(['preset_isActive' => false]);
            // $this->preset_isActive = true;
            // $this->save();


            self::where('id', '!=', $this->id)->update(['preset_isActive' => false]);
            if (! $this->preset_isActive) {
                $this->preset_isActive = true;
                $this->save();
            }
        });
    }
}
