<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ChatStreamTest extends TestCase
{
    /**
     * A basic feature test example.
     */

    use RefreshDatabase;

    public function test_chatbot_stream_returns_test_response_in_testing_environment(){
        $payload = [
            'content' => [
                [
                    'type'=>'prompt',
                    'content' => 'Halo AI, apa kabar?'
                ]
            ]
        ];

        // $response = $this->post('/chatbot/stream', $payload);
        $response = $this->post(route('chatbot.stream'), $payload);
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/event-stream; charset=utf-8');
        $this->assertEquals('This is a test response.', $response->streamedContent());
        $this->assertDatabaseHas('messages', [
            'role'=>'assistant',
            'message_content' => 'This is a test response.',
        ]);
    }


    // public function test_example(): void
    // {
    //     $response = $this->get('/');

    //     $response->assertStatus(200);
    // }
}
