<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAgendaRequest extends FormRequest
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
            'content' => 'required|string|min:4|max:255',
            'note' => 'nullable|string|max:1000',
            'progress'=>'integer|min:0|max:100|sometimes',
            'isSuspended'=>'boolean|sometimes',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id'
        ];
    }

    public function messages(): array
    {
        return [
            'content.required' => 'The Agenda must be filled.',
            'content.min'      => 'The agenda needs minimum of 5 character',
        ];
    }
}
