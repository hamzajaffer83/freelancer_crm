<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClientSource extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'icon',
        'name',
        'slug',
        'description',
        'is_active',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'source_id');
    }
}
