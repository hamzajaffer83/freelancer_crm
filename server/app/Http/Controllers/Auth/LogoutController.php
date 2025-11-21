<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Log;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Delete the current access token
            $user->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Logged out successfully'
            ], 200);

        } catch (Exception $e) {
            Log::error('Logout Error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

}
