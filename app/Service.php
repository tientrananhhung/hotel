<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    // mapping table services in database
    protected $table = 'services';

    // table services in database don't have created_date and updated_date
    public $timestamps = false;

    // Fillable fields - Use Mass Assignment
    protected $fillable = ['name', 'price', 'description'];
    
}