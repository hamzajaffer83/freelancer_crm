<?php

namespace App\Http\Controllers\Settings;

use App\Helpers\SlugHelper;
use App\Http\Controllers\Controller;
use App\Models\ClientIndustry;
use App\Models\ClientLabel;
use App\Models\ClientSource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
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
            Log::error('Error getting client labels: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function getClientIndustryData(Request $request)
    {
        try {
            $clientIndustry = ClientIndustry::get();
            return response()->json([
                'success' => true,
                'data' => $clientIndustry,
            ]);
        } catch (\Exception $e) {
            Log::error('Error getting client industry: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function getClientSourceData(Request $request)
    {
        try {
            $clientSource = ClientSource::get();
            return response()->json([
                'success' => true,
                'data' => $clientSource,
            ]);
        } catch (\Exception $e) {
            Log::error('Error getting client source: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function storeLabel(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255', 'unique:client_labels,name'],
                'description' => ['nullable', 'string', 'max:255'],
                'color' => ['required', 'string', 'max:255'],
            ]);

            $slug = SlugHelper::generate($validated['name'], 'client_labels', 'slug');

            $label = ClientLabel::create([
                'name' => $validated['name'],
                'slug' => $slug,
                'description' => $validated['description'],
                'tag_color' => $validated['color'],
            ]);

            return redirect()->back()->with([
                "success" => "Client Label Created Successfully",
                'newlyCreatedData' => $label
            ]);

        } catch (\Throwable $e) {
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                throw $e;
            }

            Log::error('Error Store Client Label: ' . $e->getMessage());
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function updateLabel(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255', Rule::unique('client_labels', 'name')->ignore($id),],
                'description' => ['nullable', 'string', 'max:255'],
                'color' => ['required', 'string', 'max:255'],
            ]);

            $label = ClientLabel::findOrFail($id);

            if ($label->name == $validated['name']) {
                $slug = $label->slug;
            } else {
                $slug = SlugHelper::generate($validated['name'], 'client_labels', 'slug');
            }

            $label->name = $validated['name'];
            $label->slug = $slug;
            $label->description = $validated['description'];
            $label->tag_color = $validated['color'];
            $label->save();

            return redirect()->back()->with([
                "success" => "Client Label Updated Successfully",
                'updatedData' => $label
            ]);

        } catch (\Throwable $e) {
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                throw $e;
            }

            Log::error('Error Store Client Label: ' . $e->getMessage());
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function destroyLabel(string $id)
    {
        try {
            $label = ClientLabel::findOrFail($id);
            $label->delete();
            return redirect()->back()->with("success", "Client Label Deleted Successfully");
        } catch (\Throwable $e) {
            Log::error('Error deleting  Client Label: ' . $e->getMessage());
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function storeIndustry(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255', 'unique:client_industries,name'],
                'description' => ['nullable', 'string', 'max:255'],
            ]);

            $slug = SlugHelper::generate($validated['name'], 'client_industries', 'slug');

            $industry = ClientIndustry::create([
                'name' => $validated['name'],
                'slug' => $slug,
                'description' => $validated['description'],
            ]);

            return redirect()->back()->with([
                "success" => "Client Industry Created Successfully",
                'newlyCreatedData' => $industry
            ]);

        } catch (\Throwable $e) {
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                throw $e;
            }

            Log::error('Error Store Client Industry: ' . $e->getMessage());
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function updateIndustry(Request $request, string $id)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255', Rule::unique('client_industries', 'name')->ignore($id),],
                'description' => ['nullable', 'string', 'max:255'],
                'color' => ['required', 'string', 'max:255'],
            ]);

            $industry = ClientIndustry::findOrFail($id);

            if ($industry->name == $validated['name']) {
                $slug = $industry->slug;
            } else {
                $slug = SlugHelper::generate($validated['name'], 'client_industries', 'slug');
            }

            $industry->name = $validated['name'];
            $industry->slug = $slug;
            $industry->description = $validated['description'];
            $industry->save();

            return redirect()->back()->with([
                "success" => "Client Industry Updated Successfully",
                'updatedData' => $industry
            ]);
        } catch (\Throwable $e) {
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                throw $e;
            }

            Log::error('Error updating Client Industry: ' . $e->getMessage());
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function destroyIndustry(string $id)
    {
        try {
            $industry = ClientIndustry::findOrFail($id);
            $industry->delete();
            return redirect()->back()->with("success", "Client Industry Deleted Successfully");
        } catch (\Throwable $e) {
            Log::error('Error deleting  Client Industry: ' . $e->getMessage());
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function storeSource(Request $request)
    {
        try {
            $validated = $request->validate([
                'icon' => ['required'],
                'name' => ['required', 'string', 'max:255', 'unique:client_sources,name'],
                'description' => ['nullable', 'string', 'max:255'],
            ]);

            $slug = SlugHelper::generate($validated['name'], 'client_sources', 'slug');

            $source = ClientSource::create([
                "icon" => $validated['icon'],
                'name' => $validated['name'],
                'slug' => $slug,
                'description' => $validated['description'],
            ]);

            return redirect()->back()->with([
                "success" => "Client Source Created Successfully",
                'newlyCreatedData' => $source
            ]);
        } catch (\Throwable $e) {
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                throw $e;
            }

            Log::error('Error Store Client Source: ' . $e->getMessage());
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function updatesource(Request $request, string $id)
    {
        try {
            $validated = $request->validate([
                "icon"=> ["required"],
                'name' => ['required', 'string', 'max:255', Rule::unique('client_sources', 'name')->ignore($id),],
                'description' => ['nullable', 'string', 'max:255'],
                'color' => ['required', 'string', 'max:255'],
            ]);

            $source = ClientIndustry::findOrFail($id);

            if ($source->name == $validated['name']) {
                $slug = $source->slug;
            } else {
                $slug = SlugHelper::generate($validated['name'], 'client_sources', 'slug');
            }

            $source->icon = $validated['icon'];
            $source->name = $validated['name'];
            $source->slug = $slug;
            $source->description = $validated['description'];
            $source->save();

            return redirect()->back()->with([
                "success" => "Client Source Updated Successfully",
                'updatedData' => $source
            ]);
        } catch (\Throwable $e) {
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                throw $e;
            }

            Log::error('Error updating Client Source: ' . $e->getMessage());
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function destroySource(string $id)
    {
        try {
            $source = ClientSource::findOrFail($id);
            $source->delete();
            return redirect()->back()->with("success", "Client Source Deleted Successfully");
        } catch (\Throwable $e) {
            Log::error('Error deleting Client Source: ' . $e->getMessage());
            return redirect()->back()->with("error", $e->getMessage());
        }
    }
}
