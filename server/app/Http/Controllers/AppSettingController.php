<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppSettingRequest;
use App\Models\AppSetting;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AppSettingController extends Controller
{

    public function index(){
        try {
            $appSettings = AppSetting::get();

            return response()->json([
                'message' => 'Here is the list of all app settings',
                'data' => $appSettings
            ], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function store(AppSettingRequest $request)
    {
        try {
            $setting = AppSetting::create($request->validated());

            return response()->json([
                'status' => true,
                'message' => 'Setting created successfully.',
                'data' => $setting
            ], 201);
        } catch (Exception $e) {
            Log::error('Setting Store Error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $app_setting = AppSetting::find($id);

            if (!$app_setting) {
                return response()->json([
                    'message' => 'No data found'
                ], 404);
            }

            return response()->json([
                'message' => 'Here is the data',
                'data' => $app_setting
            ], 200);

        } catch (Exception $e) {
            Log::error('Setting Show Error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $setting = AppSetting::find($id);

            if (!$setting) {
                return response()->json([
                    'status' => false,
                    'message' => 'Setting not found.'
                ], 404);
            }

            $setting->update($request->validated());

            return response()->json([
                'status' => true,
                'message' => 'Setting updated successfully.',
                'data' => $setting
            ], 200);
        } catch (Exception $e) {
            Log::error('Setting Update Error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Internal Server Error'
            ], 500);
        }
    }
}
