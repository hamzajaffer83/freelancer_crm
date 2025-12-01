<?php

namespace App\Http\Controllers\Settings;

use App\Helpers\FileHelper;
use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AppSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appSetting = AppSetting::all();

        return Inertia::render("settings/app-setting", [
            'appSetting' => $appSetting,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'app_title' => ['required', 'string', 'max:255'],
                'app_logo' => [
                    'nullable',
                    'image',
                    'max:2048',
                    'mimes:jpeg,png,jpg,gif,svg',
                    'dimensions:width=174,height=40',
                ],
                'favicon' => [
                    'nullable',
                    'image',
                    'max:2048',
                    'mimes:jpeg,png,jpg,gif,svg',
                    'dimensions:width=32,height=32',
                ],
            ]);

            foreach ($validated as $key => $value) {
                if ($request->hasFile($key)) {
                    // Get old file path if it exists
                    $oldSetting = AppSetting::where('key', $key)->first();
                    if ($oldSetting && $oldSetting->value) {
                        FileHelper::delete($oldSetting->value);
                    }

                    $path = FileHelper::store($request->file($key), 'settings');

                    AppSetting::updateOrCreate(
                        ['key' => $key],
                        ['value' => $path]
                    );
                } else {
                    AppSetting::updateOrCreate(
                        ['key' => $key],
                        ['value' => $value]
                    );
                }
            }

            Cache::forget('app_settings');
            Cache::rememberForever('app_settings', function () {
                return AppSetting::all()->pluck('value', 'key')->toArray();
            });

            return back()->with('success', 'Settings updated!');
        } catch (\Throwable $e) {

            if ($e instanceof \Illuminate\Validation\ValidationException) {
                throw $e;
            }

            Log::error('Error Store App Setting: ' . $e->getMessage());
            return back()->with('error', 'Something went wrong');
        }
    }
}
