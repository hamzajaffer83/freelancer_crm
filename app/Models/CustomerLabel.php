<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerLabel extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'icon',
        'name',
        'tag_color',
        'slug',
        'description',
        'is_active',
        'sort_order',
        'type',
    ];
}
