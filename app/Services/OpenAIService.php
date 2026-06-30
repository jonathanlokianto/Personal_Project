<?php

namespace App\Services;

use App\Models\Message;
use Exception;

class OpenAIService
{
    public function getStreamCallback()
    {
        $settings = \App\Models\ChatProxySetting::where('isActive', true) -> first();

        // $modelName = config('openai.default_model', 'qwen/qwen3-coder:free');

        
        return function() use ($settings) {
            $presetName = $settings ?-> preset_name ?? config('openai.presetName');
            $modelName = $settings ?-> model_name ?? config('openai.modelName');
            $baseUri = $settings ?-> model_proxy_url ?? config('openai.proxyUrl');
            $apiKey = $settings ?-> model_api_key ?? config('openai.ApiKey');
            $customPrompt = $settings ?-> model_custom_prompt ?? "";
            
            // 1. Ambil 10 pesan terakhir dari database agar AI punya "ingatan"
            // (Termasuk pesan user yang baru saja di-save di Controller)
            $history = Message::latest()->take(10)->get()->reverse();

            // 2. Susun format pesan untuk OpenAI
            $openAIMessages = [];

            // Tambahkan "Ruh/Sikap" AI (System Prompt)
            $openAIMessages[] = [
                'role' => 'system',
                'content' => 'Kamu adalah asisten virtual cerdas di dalam sebuah dashboard pribadi. Selalu berikan jawaban yang detail, terstruktur, dan analitis. Jangan hanya menjawab dengan salam singkat.'
            ];

            // Masukkan riwayat chat ke dalam payload
            foreach ($history as $chat) {
                $openAIMessages[] = [
                    'role' => $chat->role,
                    'content' => $chat->message_content
                ];
            }
            
            $fullResponse = '';

            // 3. Eksekusi API
            if(app()->environment('testing') || ! config('openai.api_key')){
                $fullResponse = 'This is a test response.';
                echo $fullResponse;
                ob_flush();
                flush();
            } else {
                try{
                    $client = \OpenAI::factory()
                        ->withApiKey(config('openai.api_key'))
                        ->withBaseUri(config('openai.base_uri'))
                        ->withHttpHeader('HTTP-Referer', config('app.url')) 
                        ->withHttpHeader('X-Title', 'Personal Dashboard') 
                        ->make();

                    $stream = $client->chat()->createStreamed([
                        'model' => $modelName,
                        'messages' => $openAIMessages,
                    ]);

                    // Looping chunk stream
                    foreach($stream as $response){
                        $chunk = $response->choices[0]->delta->content;
                        if ($chunk !== null) {
                            $fullResponse .= $chunk;
                            echo $chunk;
                            ob_flush();
                            flush();
                        }
                    }
                }
                catch (Exception $e){ 
                    $fullResponse = 'Error: ' . $e->getMessage();
                    echo $fullResponse;
                    ob_flush();
                    flush();
                }
            }

            // 4. Simpan balasan AI ke Database
            if($fullResponse){
                Message::create([            
                    'role' => 'assistant',
                    'message_content'=> $fullResponse,
                ]);
            }
        };
    }
}