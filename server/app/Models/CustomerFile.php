<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerFile extends Model
{
    protected $fillable = [
        'customer_id',
        'user_id',
        'file_name',
        'original_name',
        'mime_type',
        'size'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
}
