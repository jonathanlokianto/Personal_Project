<?php

use App\Events\RealtimeNotificationEvent;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ChatProxySettingController;
use App\Http\Controllers\Mp3DownloaderController;
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


Route::prefix('mp3-downloader')->name('mp3-downloader.')->group(function () {
    Route::get('/', [Mp3DownloaderController::class, 'index'])->name('index');
    Route::post('/', [Mp3DownloaderController::class, 'store'])->name('store');
    Route::get('/download/{filename}', [Mp3DownloaderController::class, 'downloadFile'])->name('download');
    });
    
// Route::get('/mp3-downloader', [Mp3DownloaderController::class, 'index'])->name('mp3-downloader.index');
// Route::post('/mp3-download', [])

Route::resource('/tag', TagController::class);


Route::prefix('chatbot')->name('chatbot.')->group(function () {
    Route::get('/', [MessageController::class, 'index'])->name('index');
    Route::delete('/clear', [MessageController::class, 'destroy'])->name('clear');
    Route::post('/stream', [MessageController::class, 'stream'])->name('stream');
    
    
    Route::resource('/proxy-settings', ChatProxySettingController::class);
    Route::post('/proxy-settings/{item}/set-active', [ChatProxySettingController::class, 'setPresetActive'])
        ->name('proxy-settings.set-active');
    });




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