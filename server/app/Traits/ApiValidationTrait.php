<?php

namespace App\Traits;

use Illuminate\Contracts\Validation\Validator;

trait ApiValidationTrait
{
    protected function failedValidation(Validator $validator)
    {
        return failed_api_validation($validator);
    }
}
