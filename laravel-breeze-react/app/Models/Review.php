<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'ad_id',
        'reviewer_id',
        'status',
        'comments',
        'reviewed_at',
    ];

    public function ad()
    {
        return $this->belongsTo(Ad::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }
}
