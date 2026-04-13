<?php

use App\Events\RealtimeNotificationEvent;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
Route::resource('/chatbot', MessageController::class);