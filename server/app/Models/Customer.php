<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'type',
        'name',
        'contact_person',
        'email',
        'phone',
        'website',
        'industry_id',
        'source_id',
        'status_id',
        'rating',
        'created_by',
        'notes',
        'custom_field'
    ];

    public function industry(){
        return $this->belongsTo(CustomerIndustry::class, 'industry_id', 'id');
    }

    public function source(){
        return $this->belongsTo(CustomerSource::class, 'source_id', 'id');
    }

    public function status(){
        return $this->belongsTo(CustomerStatus::class, 'status_id', 'id');
    }

    public function contacts(){
        return $this->hasMany(CustomerContact::class, 'customer_id', 'id');
    }

    public function address(){
        return $this->hasMany(CustomerContact::class, 'customer_id', 'id');
    }

    public function files(){
        return $this->hasMany(CustomerFile::class, 'customer_id', 'id');
    }

    public function notes(){
        return $this->hasMany(CustomerNote::class, 'customer_id', 'id');
    }
}
