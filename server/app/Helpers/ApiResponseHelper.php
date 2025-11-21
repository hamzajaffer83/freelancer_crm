<?php

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

if (! function_exists('failed_api_validation')) {
    function failed_api_validation(Validator $validator)
    {
        $response = response()->json([
            'status' => false,
            'errors' => $validator->errors(),
        ], 422);

        throw new ValidationException($validator, $response);
    }
}
