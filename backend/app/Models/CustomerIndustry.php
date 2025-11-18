<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerIndustry extends Model
{
    protected $fillable = [
        'name',
        'slug'
    ];

    public function customer(){
        return $this->hasMany(Customer::class, 'industry_id', 'id');
    }
}
