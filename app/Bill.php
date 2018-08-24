<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bill extends Model
{
    use SoftDeletes;

    // mapping table bills in database
    protected $table = 'bills';

    // table bills in database don't have created_date and updated_date
    // public $timestamps = false;

    protected $dates = ['deleted_at'];

    // Fillable fields - Use Mass Assignment
    protected $fillable = ['to', 'discount', 'total', 'order_id'];

    // Relationship with table Orders
    public function order()
    {
        return $this->belongsTo('App\Order');
    }
}
