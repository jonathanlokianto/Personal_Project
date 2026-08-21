<?php

namespace App\Http\Controllers;

use App\Events\MessageHistoryTruncatedEvent;
use App\Events\RealtimeChatbotEvent;
use App\Events\RealtimeNotificationEvent;
use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Services\OpenAIService;
use Exception;

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
        try {
            Message::truncate();
            broadcast(new MessageHistoryTruncatedEvent())->toOthers();
            return back();
        } catch (Exception $e) {
            return back()->withErrors(['message' => 'Failed to delete: ' . $e->getMessage()]);
        }
    }


    public function stream(Request $request, OpenAIService $openAIService){
        $messages = $request->input('content', []);

        if(empty($messages)){
            return;
        }

        $userPrompt = $messages[0]['content'];
        $isResend = $messages[0]['isResend'] ?? false;

        if(!$isResend){
            Message::create([
                'role' => 'user',
                'message_content' => $userPrompt,
            ]);
        } else {
            $lastMessage = Message::latest()->first();
            if ($lastMessage && $lastMessage->role === 'assistant') {
                $lastMessage->delete();
            }
        }
        

        $callback = $openAIService->getStreamCallback();

        // Controller HANYA mengurus pengembalian Response dan Header HTTP
        return response()->stream($callback, 200, [
            'Cache-Control' => 'no-cache',
            'Content-Type' => 'text/event-stream',
            'X-Accel-Buffering' => 'no',
            'Connection' => 'keep-alive',
        ]);
    }
}
