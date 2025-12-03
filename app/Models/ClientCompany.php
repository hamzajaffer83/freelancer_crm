<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClientCompany extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        "client_id",
        'name',
        'website',
        'email',
        'phone',
        'country',
        'state',
        'city',
        'address',
        'industry_id',
        'notes',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function industry()
    {
        return $this->belongsTo(ClientIndustry::class, 'industry_id');
    }
}
