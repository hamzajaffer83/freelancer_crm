<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerStatus extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'tag_color'
    ];

    public function customer(){
        return $this->hasMany(Customer::class, 'industry_id', 'id');
    }
}
