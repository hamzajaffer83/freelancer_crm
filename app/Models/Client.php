<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'salutation',
        'name',
        'email',
        'password',
        'country',
        'mobile_number',
        'profile_pic',
        'gender',
        'added_by',
        'source_id',
        'industry_id',
        'label_id',
    ];

    public function addedBy()
    {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function source()
    {
        return $this->belongsTo(ClientSource::class, 'source_id');
    }

    public function industry()
    {
        return $this->belongsTo(ClientIndustry::class, 'industry_id');
    }

    public function label()
    {
        return $this->belongsTo(ClientLabel::class, 'label_id');
    }

    public function adresses()
    {
        return $this->hasMany(ClientAddress::class, 'client_id');
    }

    public function companies()
    {
        return $this->hasMany(ClientCompany::class, 'client_id');
    }
}
