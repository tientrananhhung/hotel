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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

/**
 * api/user dạng GET sẽ lấy toàn bộ danh sách user
 * api/user dạng POST sẽ thêm mới user (name(*), birthday, address, phone(*), email, password, isadmin(*)) Trường (*) bắt buộc
 * api/user/id dạng GET là tìm một user theo id
 * api/user/id dạng PUT là cập nhật một user theo id (name, birthday, address, phone, email, password, isadmin)
 * api/user/id dạng DELETE là xóa một user theo id
 */
Route::resource('user', 'UserController');

// Find users by name or email (Truyền một từ về name hoặc email - Dạng GET)
Route::get('user/find/{keyword}', 'UserController@find');

// Login - Truyền Email và Password theo dạng POST
Route::post('login', 'UserController@postLogin');

// Forgot password - Truyền Email theo dạng POST
Route::post('forgot', 'ResetPasswordController@postSend');

// Get email when use function Forgot Password - Truyền tham số token
Route::post('getEmail', function(Request $request){
    $token = $request->get('token');
    $emails = DB::table('password_resets')->get();
    foreach($emails as $email){
        if (password_verify($token, $email->token)){
            return $email->email;
        }
    }
});

/**
 * ROOMS
 * api/room dạng GET sẽ lấy toàn bộ danh sách room
 * api/room dạng POST sẽ thêm mới room (name(*), type(*), status(*), price(*), note) Trường (*) bắt buộc
 * api/room/id dạng GET là tìm một room theo id
 * api/room/id dạng PUT là cập nhật một room theo id (name, type, status, price, note)
 * api/room/id dạng DELETE là xóa một room theo id
 */
Route::resource('room', 'RoomController');

// Get list rooms booked - 0 is booked
Route::get('getRoomBooked', 'RoomController@getRoomBooked');

// Get list rooms book - 1 is book
Route::get('getRoomBook', 'RoomController@getRoomBook');

// Get list rooms by Date - parameter date
Route::post('postRoomByDate', 'RoomController@postRoomByDate');

/**
 * SERVICES
 * api/service dạng GET sẽ lấy toàn bộ danh sách service
 * api/service dạng POST sẽ thêm mới service (name(*), price(*), description(*)) Trường (*) bắt buộc
 * api/service/id dạng GET là tìm một service theo id
 * api/service/id dạng PUT là cập nhật một service theo id (name, price, description)
 * api/service/id dạng DELETE là xóa một service theo id
 */
Route::resource('service', 'ServiceController');

/**
 * CUSTOMERS
 * api/customer dạng GET sẽ lấy toàn bộ danh sách customer
 * api/customer dạng POST sẽ thêm mới customer (name(*), birthday, address, phone(*), indentity_card, count, note, email) Trường (*) bắt buộc
 * api/customer/id dạng GET là tìm một customer theo id
 * api/customer/id dạng PUT là cập nhật một customer theo id (name, birthday, address, phone, indentity_card, count, note, email)
 * api/customer/id dạng DELETE là xóa một customer theo id
 */
Route::resource('customer', 'CustomerController');

// Find customers by name or email (Truyền một từ về name hoặc email - Dạng GET)
Route::get('customer/find/{keyword}', 'CustomerController@find');

// Send mail birthday - Truyền Email theo dạng POST
Route::post('mailhpbd', ['uses' => 'MailController@sendMail', 'as' => 'postlienhe']);

/**
 * ORDERS
 * api/order dạng GET sẽ lấy toàn bộ danh sách order
 * api/order dạng POST sẽ thêm mới order (from(*), to(*), service - dạng mảng(*), from_rent(*), customer_id, user_id, room_id) Trường (*) bắt buộc
 * api/order/id dạng GET là tìm một order theo id
 * api/order/id dạng PUT là cập nhật một order theo id (from, to, service - dạng mảng, from_rent, customer_id, user_id, room_id)
 * api/order/id dạng DELETE là xóa một order theo id
 */
Route::resource('order', 'OrderController');

/**
 * BILLS
 * api/bill dạng GET sẽ lấy toàn bộ danh sách bill
 * api/bill dạng POST sẽ thêm mới bill (to(*), discount, total(*), order_id(*)) Trường (*) bắt buộc
 * api/bill/id dạng GET là tìm một bill theo id
 * api/bill/id dạng PUT là cập nhật một bill theo id (to, discount, total, order_id)
 * api/bill/id dạng DELETE là xóa một bill theo id
 */
Route::resource('bill', 'BillController');

/**
 * PAGINATION
 * api/pusers phan trang users
 * api/pservices phan trang services
 * api/prooms phan trang rooms
 * api/porders phan trang orders
 * api/pcustomers phan trang customers
 * api/pbills phan trang bills
 */
// Phân trang cho user (10)
// ví dụ /api/pusers?pages=2
Route::get('pusers', 'UserController@pagination');

// Phân trang cho service (10)
Route::get('pservices', 'ServiceController@pagination');

// Phân trang cho room (10)
Route::get('prooms', 'RoomController@pagination');

// Phân trang cho order (10)
Route::get('porders', 'OrderController@pagination');

// Phân trang cho customer (10)
Route::get('pcustomer', 'CustomerController@pagination');

// Phân trang cho bill (10)
Route::get('pbills', 'BillController@pagination');