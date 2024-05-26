<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'seller',
        'price',
        'currency',
        'start_price',
        'images',
        'condition',
        'brand',
        'model',
        'features',
        'date_posted',
        'view_count',
        'favorite_count',
        'status'
    ];

    protected $casts = [
        'images' => 'array',
        'features' => 'array',
        'date_posted' => 'datetime',
    ];

    public function reviews()
    {
        return $this->hasOne(Review::class);
    }
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller');
    }
}
