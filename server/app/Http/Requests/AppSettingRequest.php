<?php

namespace App\Http\Requests;

use App\Traits\ApiValidationTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AppSettingRequest extends FormRequest
{
    use ApiValidationTrait;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('id') ?? $this->route('setting');

        return [
            'key' => [
                'required',
                'string',
                Rule::unique('settings', 'key')->ignore($id),
            ],

            'value' => [
                'required',
                'string'
            ],

            'description' => [
                'nullable',
                'string'
            ],

            'active' => [
                'boolean'
            ],
        ];
    }

    public function messages()
    {
        return [
            'key.required' => 'The key field is required.',
            'key.unique' => 'This key already exists.',
            'value.required' => 'The value field is required.',
        ];
    }
}
