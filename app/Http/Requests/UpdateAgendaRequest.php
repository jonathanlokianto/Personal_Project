<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAgendaRequest extends FormRequest
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
            'content' => 'sometimes|required|string|min:4|max:255',
            'note' => 'sometimes|nullable|string|max:1000',
            'progress'=>'sometimes|integer|min:0|max:100',
            'isSuspended'=>'sometimes|boolean',
            'tags'=> 'sometimes|nullable|array',
            'tags.*' => 'exists:tags,id'
        ];
    }
}
