<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    // mapping table customers in database
    protected $table = 'customers';

    // table customers in database don't have created_date and updated_date
    public $timestamps = false;

    // Fillable fields - Use Mass Assignment
    protected $fillable = ['name', 'birthday', 'address', 'phone', 'avatar', 'identity_card', 'count', 'note', 'email'];

    // Relationship with table Orders
    public function orders()
    {
        return $this->hasMany('App\Order');
    }
}