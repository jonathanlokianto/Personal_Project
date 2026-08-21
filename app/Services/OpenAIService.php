<?php

namespace App\Services;

use App\Models\Message;
use Exception;

class OpenAIService
{
    public function getStreamCallback()
    {
        $settings = \App\Models\ChatProxySetting::where('preset_isActive', true) -> first();

        // $modelName = config('openai.default_model', 'qwen/qwen3-coder:free');

        
        return function() use ($settings) {
            $presetName = $settings ?-> preset_name ?? config('openai.preset_name');
            $modelName = $settings ?-> model_name ?? config('openai.model_name');
            $apiKey = $settings ?-> model_api_key ?? config('openai.api_key');
            $baseUri = $settings ?-> model_proxy_url ?? config('openai.model_provider_uri');
            $customPrompt = $settings ?-> model_custom_prompt ?? config('openai.model_custom_prompt');

            $isSuccess = true;
            
            // 1. Ambil 10 pesan terakhir dari database agar AI punya "ingatan"
            // (Termasuk pesan user yang baru saja di-save di Controller)
            $history = Message::latest()->take(10)->get()->reverse();

            // 2. Susun format pesan untuk OpenAI
            $openAIMessages = [];

            // Tambahkan "Ruh/Sikap" AI (System Prompt)
            $openAIMessages[] = [
                'role' => 'system',
                'content' => 'Provide detailed, structured, and analytical answers. Do not simply respond with a brief greeting.
.'
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
                        ->withApiKey($apiKey)
                        ->withBaseUri($baseUri)
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
                            $payload = json_encode(['status'=> 'success', 'chunk'=>$chunk]);
                            $fullResponse .= $chunk;
                            
                            // echo $chunk;

                            echo "data: " . $payload . "\n\n";
                            ob_flush();
                            flush();
                        }
                    }
                }
                catch (Exception $e){ 
                    $payload = json_encode([
                        'status' => 'error', 
                        'message' => $e->getMessage()
                    ]);

                    // $fullResponse = 'Error: ' . $e->getMessage();
                    // echo $fullResponse;

                    echo "data: " . $payload . "\n\n";
                    ob_flush();
                    flush();
                    $isSuccess = false;
                }
            }

            // 4. Simpan balasan AI ke Database
            if($fullResponse && $isSuccess){
                Message::create([            
                    'role' => 'assistant',
                    'message_content'=> $fullResponse,
                ]);
            }
        };
    }
}