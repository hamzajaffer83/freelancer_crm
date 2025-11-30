<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CustomerStatusRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CustomerStatus extends Controller
{
    public function index(Request $request)
    {
        try {
            $per_page = 10;

            $query = CustomerStatus::query();
            $customerStatus = $query->get($per_page);

            return response()->json([
                'message' => 'All Customer List',
                'data' => $customerStatus
            ], 200);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function store(CustomerStatusRequest $request)
    {
        try {
            $originalSlug = Str::slug($request->name);
            $slug = $originalSlug;
            $counter = 1;

            while (\App\Models\CustomerStatus::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $status = \App\Models\CustomerStatus::create([]);


        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
