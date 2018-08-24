<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{

    use SoftDeletes;

    // mapping table rooms in database
    protected $table = 'rooms';

    // table rooms in database don't have created_date and updated_date
    public $timestamps = false;

    protected $dates = ['deleted_at'];

    // Fillable fields - Use Mass Assignment
    protected $fillable = ['name', 'type', 'status', 'price', 'note'];

    // Relationship with table Orders
    public function orders()
    {
        return $this->hasMany('App\Order');
    }
}