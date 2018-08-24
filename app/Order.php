<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{

    use SoftDeletes;

    // mapping table orders in database
    protected $table = 'orders';

    // table orders in database don't have created_date and updated_date
    // public $timestamps = false;

    protected $dates = ['deleted_at'];

    // Fillable fields - Use Mass Assignment
    protected $fillable = ['from', 'to', 'data', 'from_rent', 'created_at', 'updated_at', 'customer_id', 'user_id', 'room_id', 'status'];

    public function getDataAttribute($value)
    {
        return json_decode($value);
    }

    // Relationship with table users
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    // Relationship with table rooms
    public function room()
    {
        return $this->belongsTo('App\Room');
    }

    // Relationship with table customers
    public function customer()
    {
        return $this->belongsTo('App\Customer');
    }

    // Relationship with table bills
    public function bill()
    {
        return $this->hasOne('App\Bill');
    }
}