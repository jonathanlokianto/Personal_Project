<?php

namespace App\Http\Controllers;

use App\Events\RealtimeNotificationEvent;
use App\Http\Requests\StoreAgendaRequest;
use App\Http\Requests\UpdateAgendaRequest;
use App\Models\Agenda;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private const MAX_PAGINATE = 3;

    public function index(Request $request)
    {
        
        $include = $request->include;
        $exclude = $request->exclude;
        $search = $request->search;

        $query = Agenda::with('tags')->latest();

        if(!empty($search)){
            $query  ->where(function($q) use ($search){
                    $q  ->where('content', 'like', "%{$search}%")
                        ->orWhere('note', 'like', "%{$search}%");
            });
        }

        if (!empty($include)) {
            $includeTags = array_map('trim', explode(',', $include));
            $query->whereHas('tags', function($q) use ($includeTags) {
                $q->whereIn('tag_name', $includeTags);
            });
        }

        if (!empty($exclude)) {
            $excludeTags = array_map('trim', explode(',', $exclude));
            $query->whereDoesntHave('tags', function($q) use ($excludeTags) {
                $q->whereIn('tag_name', $excludeTags);
            });
        }

        $agendas = $query->paginate(self::MAX_PAGINATE)->withQueryString();
        $tags = Tag::all();

        return inertia('Agenda/Index', [
            'agendas' => $agendas,
            'tags' => $tags,
            'filters' => $request->only(['search', 'include', 'exclude'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAgendaRequest $request)
    {
        $validated = $request->validated();
        $agenda = Agenda::create($validated);

        if($request->has('tags')){
            $agenda->tags()->sync($request->tags);
        }



        // BROADCAST FROM REVERB TO ECHO
        broadcast(new RealtimeNotificationEvent('A new agenda has been Added!', 'positive'));

        // return redirect()->back()->with([
        //     'type'=>'positive',
        //     'message'=> 'A new agenda has been Added!'
        // ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Agenda $agenda)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAgendaRequest $request, Agenda $agenda)
    {
        $validated = $request->validated();
        if (isset($validated['progress'])) {
            $validated['completed_at'] = $validated['progress'] == 100 ? now() : null;
        }
        
        $agenda->update($validated);
        if($request->has('tags')){
            $agenda->tags()->sync($request->tags);
        }

        broadcast(new RealtimeNotificationEvent('The Agenda has been updated successfully!', 'positive'));

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agenda $agenda)
    {
        $agenda->delete();
        broadcast(new RealtimeNotificationEvent('The Agenda has been deleted.', 'negative'));
        return back();
        // return back()->with([
        //     'type' => 'negative',
        //     'message' => 'Agenda is deleted'
        // ]);
    }
}
