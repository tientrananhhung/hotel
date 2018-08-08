<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('user', 'UserController');

Route::resource('room', 'RoomController');

Route::resource('service', 'ServiceController');

Route::resource('customer', 'CustomerController');

Route::resource('order', 'OrderController');

Route::resource('bill', 'BillController');