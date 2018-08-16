<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reset extends Model
{
    // mapping table password_resets in database
    protected $table = 'password_resets';

     // table password_resets in database don't have created_date and updated_date
    public $timestamps = false;

    // Fillable fields - Use Mass Assignment
    protected $fillable = ['email', 'token'];
}