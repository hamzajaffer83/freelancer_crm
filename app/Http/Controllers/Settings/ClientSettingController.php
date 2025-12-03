<?php

namespace App\Http\Controllers\Settings;

use App\Helpers\SlugHelper;
use App\Http\Controllers\Controller;
use App\Models\ClientLabel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ClientSettingController extends Controller
{
    public function index()
    {
        return Inertia::render("settings/client/index");
    }

    public function getClientLabelData(Request $request)
    {
        try {
            $clientLabel = ClientLabel::get();
            return response()->json([
                'success' => true,
                'data' => $clientLabel,
            ]);
        } catch (\Exception $e) {
            Log::error('Error Store App Setting: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function getClientIndustryData(Request $request)
    {
        //
    }

    public function getClientSourceData(Request $request)
    {
        //
    }

    public function storeLabel(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string', 'max:255'],
                'color' => ['required', 'string', 'max:255'],
            ]);

            $slug = SlugHelper::generate($validated['name'], 'customer_labels', 'slug');

            ClientLabel::create([
                'name' => $validated['name'],
                'slug' => $slug,
                'description' => $validated['description'],
                'tag_color' => $validated['color'],
            ]);

            return redirect()->back()->with("success", "Customer Label Created Successfully");

        } catch (\Throwable $e) {
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                throw $e;
            }

            Log::error('Error Store App Setting: ' . $e->getMessage());
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function destroyLabel(string $id)
    {
        try {
            $label = ClientLabel::findOrFail($id);
            $label->delete();
            return redirect()->back()->with("success", "Customer Label Deleted Successfully");
        } catch (\Throwable $e) {
            Log::error('Error Store App Setting: ' . $e->getMessage());
            return redirect()->back()->with("error", $e->getMessage());
        }
    }
}
