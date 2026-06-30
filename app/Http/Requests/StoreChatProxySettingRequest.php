<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use PHPUnit\Framework\Constraint\IsTrue;

class StoreChatProxySettingRequest extends FormRequest
{
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
                'preset_name'         => 'required|string|max:255',
                'model_name'          => 'required|string|max:255',
                'model_proxy_url'     => 'required|url|max:255',
                'model_api_key'       => 'required|string|max:255',
                'model_custom_prompt' => 'nullable|string|max:1000',
                'preset_isActive'     => 'boolean',
                'isDefault'           => 'boolean'
        ];
    }
}
