<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTagRequest;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
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
    public function store(StoreTagRequest $request)
    {
        $validated = $request->validated();
        $tag = Tag::create($validated);
        return redirect()->back()->with([
            'type'=>'positive',
            'message' =>'A new TAG has been created!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StoreTagRequest $request)
    {
//
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTagRequest $request, Tag $tag)
    {
        $validated = $request->validated();
        $tag->update($validated);
        return redirect()->back()->with([
            'type'=>'positive',
            'message'=>'The TAG has been updated!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();
        return redirect()->back()->with([
            'type'=>'negative',
            'message'=>'The TAG has been deleted.'
        ]);
    }
}
