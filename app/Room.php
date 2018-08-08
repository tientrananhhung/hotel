<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    // mapping table rooms in database
    protected $table = 'rooms';

    // table rooms in database don't have created_date and updated_date
    public $timestamps = false;

    // Fillable fields - Use Mass Assignment
    protected $fillable = ['name', 'type', 'status', 'price', 'note'];

    // Relationship with table Orders
    public function Orders()
    {
        return $this->hasMany('App\Order');
    }
}