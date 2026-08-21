<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'flash' => [
                'type' => fn() => $request->session()->get('type'),
                'message' => fn() => $request->session()->get('message'),
            ],
            'savedPresets' => fn () => \App\Models\ChatProxySetting::orderBy('created_at', 'asc')->get(),
            'activePreset' => fn() => \App\Models\ChatProxySetting::where('preset_isActive', true)->first(),

            'Mp3Downloader' => [
                'download_url' => fn() => $request->session()->get('download_url'),
                'download_title'=> fn()=> $request->session()->get('download_title'),
                'download_thumbnail'=> fn()=> $request->session()->get('download_thumbnail')
            ]
        ];
    }
}