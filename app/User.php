<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'birthday', 'address', 'phone', 'avatar', 'email', 'password', 'isadmin',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    // table staff in database don't have created_date and updated_date
    public $timestamps = false;

    // Relationship with table Orders
    public function Orders()
    {
        return $this->hasMany('App\Order');
    }
}