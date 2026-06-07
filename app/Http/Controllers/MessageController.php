<?php

namespace App\Http\Controllers;

use App\Events\MessageHistoryTruncatedEvent;
use App\Events\RealtimeChatbotEvent;
use App\Events\RealtimeNotificationEvent;
use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chat = Message::latest()->take(30)->get()->reverse()->values();
        return inertia('Chatbot/Index', [
            'chatHistory' => $chat,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([            
            'role' => 'required|in:user,assistant',
            'message_content'=> 'required|string'
        ]);

        $message = Message::create($validated);


        broadcast(new RealtimeChatbotEvent($message->message_content, $message->role))->toOthers();
        return redirect()->back();
        // return redirect()->route('chatbot.show');
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        return redirect()->back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        Message::truncate();
        broadcast(new MessageHistoryTruncatedEvent())->toOthers();
        broadcast(new RealtimeNotificationEvent("The chat history has been cleared.", "negative"));
        return back();
    }


    public function stream(Request $request, String $modelName = "z-ai/glm-4.5-air:free"){
        return response()->stream(function() use ($request, $modelName){
            $messages = $request->input('content', []);
            if(empty($messages)){
                return;
            }


            $openAIMessages = collect($messages)-> map(fn($message) => [
                'role' => $message['type'] === 'prompt' ? 'user' : 'assistant',
                'content' => $message['content']
            ])->toArray();
            $fullResponse = '';

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
                        ->withHttpHeader('HTTP-Referer', config('app.url')) // Syarat wajib model gratis OpenRouter
                        ->withHttpHeader('X-Title', 'Aplikasi Skripsi/Dashboard') // Nama aplikasimu
                        ->make();

                    $stream = $client->chat()->createStreamed([
                        'model' => $modelName,
                        'messages' => $openAIMessages,
                    ]);

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
                catch (\Exception $e){ 
                    $fullResponse = 'Error: ' . $e->getMessage();
                    echo $fullResponse;
                    ob_flush();
                    flush();
                }
            }

            if($fullResponse){
                Message::create([            
                    'role' => 'assistant',
                    'message_content'=> $fullResponse,
                ]);
            }


        }, 200, [
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'text/event-stream',
            'X-Accel-Buffering' => 'no',
        ]

        
        );
    }
}
