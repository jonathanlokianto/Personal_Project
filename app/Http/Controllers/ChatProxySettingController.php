<?php

namespace App\Http\Controllers;

use App\Events\RealtimeNotificationEvent;
use App\Http\Requests\StoreChatProxySettingRequest;
use App\Models\ChatProxySetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatProxySettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreChatProxySettingRequest $request)
    {
        $validated = $request->validated();
        $preset = ChatProxySetting::create($validated);

        broadcast(new RealtimeNotificationEvent('A new proxy has been Added!', 'positive'));

        // return redirect()->back()->with([
        //     'type'=>'positive',
        //     'message'=> 'A new agenda has been Added!'
        // ]);

        return redirect()->back();

    }

    /**
     * Display the specified resource.
     */
    public function show(ChatProxySetting $chatProxySetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChatProxySetting $chatProxySetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ChatProxySetting $chatProxySetting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChatProxySetting $chatProxySetting)
    {
        //
    }

    public function setActive(ChatProxySetting $item){
        DB::transaction(function () use ($item) {
            ChatProxySetting::query()->update(['preset_isActive' => false]);
            $item->preset_isActive = true;
            $item->save();
        });

        return back();
    }
}
