<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'title' => 'required|max:255',
            // 'description' => 'required',
            // 'category' => 'required|exists:categories,id',
            // 'price' => 'required|numeric',
            // 'start_price' => 'required|numeric',
            // 'condition' => 'required',
            // 'brand' => 'nullable',
            // 'model' => 'nullable',
            // 'features' => 'nullable',
            // 'images' => 'nullable',
            // 'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
