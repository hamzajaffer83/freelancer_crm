<?php

namespace App\Providers;

use App\Models\AppSetting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'app_settings' => function () {
                return Cache::rememberForever('app_settings', function () {
                    // Assuming key/value storage
                    return AppSetting::all()->pluck('value', 'key')->toArray();
                });
            },
        ]);
    }
}
