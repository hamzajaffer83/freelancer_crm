<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class Customer extends Controller
{
    public function index()
    {
        try {
            //
        } catch(\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        //
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
