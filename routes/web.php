<?php

use App\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('mail', function () {
    return view('form');
});

// Route::get('/mail', ['uses' => 'MailController@happyBirthday', 'as' => 'getlienhe']);
Route::get('/mail', ['uses' => 'MailController@sendMail', 'as' => 'postlienhe']);

Route::get('/test', 'UserController@pagination');