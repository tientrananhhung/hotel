<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    // mapping table bills in database
    protected $table = 'bills';

    // table bills in database don't have created_date and updated_date
    public $timestamps = false;

    // Fillable fields - Use Mass Assignment
    protected $fillable = ['to', 'discount', 'total', 'order_id'];

    // Relationship with table Orders
    public function Order()
    {
        return $this->belongsTo('App\Order');
    }
}
