<?php

namespace App\Jobs;

use App\Events\RealtimeChatbotEvent;
use App\Models\Message;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

// class AiResponseProcessJob implements ShouldQueue
// {
//     use Queueable;

//     /**
//      * Create a new job instance.
//      */

//     public function __construct()
//     {
//         //
//     }

//     /**
//      * Execute the job.
//      */
//     public function handle(): void
//     {
//         $history = Message::latest()
//             ->take(10)
//             ->get()
//             ->reverse();

//         $contextWindow = [];
//         foreach ($history as $chat){
//             $role = $chat->role === 'assistant' ? 'model' : 'user';

//             $lastIndex = count($contextWindow) -1;
//             if($lastIndex >= 0 && $contextWindow[$lastIndex]['role'] === $role) {
//                 $contextWindow[$lastIndex]['parts'][0]['text'] .= "\n" . $chat->message_content;
//                 continue;
//             }


//             $contextWindow[]= [
//                 'role'=>$role,
//                 'parts'=>[
//                     ['text'=>$chat->message_content]
//                 ]
//             ];
//         }

//         if(!empty($contextWindow) && $contextWindow[0]['role'] !== 'user') {
//             array_shift($contextWindow);
//         }


//         $apiKey = Cache::get('custom_api_key', env('GEMINI_API_KEY'));
//         // $apiKey = env('GEMINI_API_KEY');
//         $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}";

//         try{
//             $response = Http::timeout(30)->post($url, [
//                 'contents' => $contextWindow
//             ]);

//             if($response->failed()){
//                 Log::error("Gemini API Error: ". $response->body());
//                 return;
//             }

//             $aiResponseText = $response->json('candidates.0.content.parts.0.text');
//             $aiMessage = Message::create([
//                 'role' => 'assistant',
//                 'message_content'=>$aiResponseText
//             ]);

//             broadcast(new RealtimeChatbotEvent($aiMessage->message_content, $aiMessage->role))->toOthers();
//         }
//         catch (\Exception $e){
//             Log::error('AI Job Failed ' . $e->getMessage());
//         }
//     }
// }
