<?php

namespace App\Http\Requests\Auth;

use App\Traits\ApiValidationTrait;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    use ApiValidationTrait;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'string',
            ],
            'password' => [
                'required',
                'string'
            ],
        ];
    }

    public function messages() {
        return [
            'email.required' => 'The email field is required.',
            'password.required' => 'The email field is required.',
        ];
    }
}
