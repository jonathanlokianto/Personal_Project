<?php

namespace Database\Seeders;

use App\Models\ChatProxySetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DefaultProxySettingSeeder extends Seeder
{
    public function run(): void
    {
        //VARIABLE
        $PRESET_NAME = config('openai.preset_name');
        $MODEL_PROXY_URL = config('openai.model_provider_uri');
        $MODEL_NAME = config('openai.model_name');
        $MODEL_API = config('openai.api_key');
        $MODEL_CUSTOM_PROMPT = config('openai.model_custom_prompt');

        ChatProxySetting::unguard();

        // 1. Cek apakah preset default ini sudah ada di database
        $existingDefault = ChatProxySetting::where('preset_name', $PRESET_NAME)->first();
        
        // 2. Logika penentuan status aktif
        $shouldBeActive = false;
        
        if ($existingDefault) {
            // Skenario A: Preset sudah ada, maka PERTAHANKAN status aktifnya yang sekarang
            $shouldBeActive = $existingDefault->preset_isActive;
        } else {
            // Skenario B: Preset belum ada (baru dibuat). 
            // Cek apakah sudah ada preset LAIN yang sedang aktif di database?
            $isAnyPresetActive = ChatProxySetting::where('preset_isActive', true)->exists();
            
            // Jika belum ada satupun yang aktif, jadikan preset ini aktif.
            // Jika sudah ada yang aktif, jadikan false agar tidak bentrok.
            $shouldBeActive = !$isAnyPresetActive;
        }

        // 3. Eksekusi penyimpanan
        ChatProxySetting::updateOrCreate(
            ['preset_name' => $PRESET_NAME], 
            [
                'model_name'          => $MODEL_NAME,
                'model_proxy_url'     => $MODEL_PROXY_URL,
                'model_api_key'       => $MODEL_API,
                'model_custom_prompt' => $MODEL_CUSTOM_PROMPT,
                'preset_isActive'     => $shouldBeActive, // Gunakan variabel logika di atas
                'preset_isDefault'    => true,
            ]
        );

        ChatProxySetting::reguard();
    }
}


