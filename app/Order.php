<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // mapping table orders in database
    protected $table = 'orders';

    // table orders in database don't have created_date and updated_date
    public $timestamps = false;

    // Fillable fields - Use Mass Assignment
    protected $fillable = ['from', 'to', 'data', 'from_rent', 'created_at', 'updated_at', 'customer_id', 'user_id', 'room_id'];

    // Relationship with table users
    public function Users()
    {
        return $this->belongsTo('App\User');
    }

    // Relationship with table rooms
    public function Rooms()
    {
        return $this->belongsTo('App\Room');
    }

    // Relationship with table customers
    public function Customers()
    {
        return $this->belongsTo('App\Customer');
    }

    // Relationship with table bills
    public function Bill()
    {
        return $this->hasOne('App\Bill');
    }
}