<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerSource extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'icon',
        'name',
        'slug',
        'description',
        'is_active',  
    ];
}
