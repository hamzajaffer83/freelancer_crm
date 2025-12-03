<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientAddress extends Model
{
    protected $fillable = [
        'client_id',
        'company_id',
        'type',
        'country',
        'state',
        'city',
        'zip_code',
        'street',
        'building',
        'apartment',
        'notes'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function company()
    {
        return $this->belongsTo(ClientCompany::class);
    }
}
