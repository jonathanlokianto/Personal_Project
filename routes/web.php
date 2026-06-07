<?php

use App\Events\RealtimeNotificationEvent;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;

// Route::get('/', function () {
//     return view('app');
// });

// Route::get('/', function(){
//     return Inertia::render("Agenda");
// });


Route::get('/', [AgendaController::class, 'index']) -> name('agenda.index');
Route::resource('/agenda', AgendaController::class) -> except('index');


// Route::get('/test-flash', fn() => back()->with([
//         'type'=> 'success',
//         'message' => '🚀 Test berhasil pada: ' . now()->format('H:i:s')
//     ])
// );

Route::get('/test-flash', function () {
    broadcast(new RealtimeNotificationEvent('🚀 Test berhasil pada: ' . now()->format('H:i:s'), 'positive'));
});

Route::resource('/tag', TagController::class);



Route::delete('/chatbot.clear', [MessageController::class, 'destroy'])->name('chatbot.clear');
Route::post('/chatbot/stream', [MessageController::class, 'stream'])->name('chatbot.stream');

Route::resource('/chatbot', MessageController::class);

// CHATBOT STREAMING RESPONSE 


//CONVENTIONAL METHODE
// Route::get('/stream', function() {
//     return response() ->stream(function ():void {
//         foreach (['user', 'assistant'] as $string) {
//             echo $string;
//             ob_flush();
//             flush();
//             sleep(2);
//         }
//     }, 200, ['X-Accel-Buffering' => 'no']);
// });


// Route::post('/chat', function() {
//     return response()->stream(function (): Generator{
//         $stream = OpenAI::client()->chat()->createStream(...);

//         foreach ($stream as $response){
//             yield $response->choices[0];
//         }
//     }, 200, ['X-Accel-Buffering' => 'no']);
// });