<?php

use Illuminate\Http\Request;
use App\User;

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

/**
 * USERS
 * api/user dạng GET sẽ lấy toàn bộ danh sách user - (parameter: limit = giới hạn phân trang, keyword = tìm kiếm theo name hoặc email)
 * api/user dạng POST sẽ thêm mới user (name(*), birthday, address, phone(*), email(*), password(*), isadmin(*)) Trường (*) bắt buộc
 * api/user/id dạng GET là tìm một user theo id
 * api/user/id dạng PUT là cập nhật một user theo id (name, birthday, address, phone, email, password, isadmin)
 * api/user/id dạng DELETE là xóa một user theo id
 */
Route::resource('user', 'UserController')->middleware('auth:api');

/**
 * ROOMS
 * api/room dạng GET sẽ lấy toàn bộ danh sách room - (parameter: limit = giới hạn phân trang, keyword = tìm kiếm theo name hoặc type)
 * api/room dạng POST sẽ thêm mới room
 *      Nếu truyền parameter from(*) và to(*) sẽ kiếm phòng trống
 *      (name(*), type(*), status(*), price(*), note) Trường (*) bắt buộc
 * api/room/id dạng GET là tìm một room theo id
 * api/room/id dạng PUT là cập nhật một room theo id (name, type, status, price, note)
 * api/room/id dạng DELETE là xóa một room theo id
 */
Route::resource('room', 'RoomController')->middleware('auth:api');

/**
 * SERVICES
 * api/service dạng GET sẽ lấy toàn bộ danh sách service - (parameter: limit = giới hạn phân trang, keyword = tìm kiếm theo name)
 * api/service dạng POST sẽ thêm mới service (name(*), price(*), description(*)) Trường (*) bắt buộc
 * api/service/id dạng GET là tìm một service theo id
 * api/service/id dạng PUT là cập nhật một service theo id (name, price, description)
 * api/service/id dạng DELETE là xóa một service theo id
 */
Route::resource('service', 'ServiceController')->middleware('auth:api');

/**
 * CUSTOMERS
 * api/customer dạng GET sẽ lấy toàn bộ danh sách customer - (parameter: limit = giới hạn phân trang, keyword = tìm kiếm theo name, email, identity_card, phone)
 * api/customer dạng POST sẽ thêm mới customer (name(*), birthday, address, phone(*), indentity_card, note, email) Trường (*) bắt buộc
 * api/customer/id dạng GET là tìm một customer theo id
 * api/customer/id dạng PUT là cập nhật một customer theo id (name, birthday, address, phone, indentity_card, note, email)
 * api/customer/id dạng DELETE là xóa một customer theo id
 */
Route::resource('customer', 'CustomerController')->middleware('auth:api');

/**
 * ORDERS
 * api/order dạng GET sẽ lấy toàn bộ danh sách order - (parameter: limit = giới hạn phân trang, keyword = tìm kiếm theo name, email, identity_card, phone)
 * api/order dạng POST sẽ thêm mới order (from(*), to(*), service - dạng mảng, customer_id(*), user_id(*), room_id(*), status(*)) Trường (*) bắt buộc
 * api/order/id dạng GET là tìm một order theo id
 * api/order/id dạng PUT là cập nhật một order theo id (from, to, service - dạng mảng, from_rent, customer_id, user_id, room_id(*), status)
 * api/order/id dạng DELETE là xóa một order theo id
 */
Route::resource('order', 'OrderController')->middleware('auth:api');

/**
 * BILLS
 * api/bill dạng GET sẽ lấy toàn bộ danh sách bill - (parameter: limit = giới hạn phân trang, keyword = tìm kiếm theo name, email, identity_card, phone)
 * api/bill dạng POST sẽ thêm mới bill (to(*), discount, order_id(*)) Trường (*) bắt buộc
 * api/bill/id dạng GET là tìm một bill theo id
 * api/bill/id dạng PUT là cập nhật một bill theo id (to(*), discount, total, order_id(*))
 * api/bill/id dạng DELETE là xóa một bill theo id
 */
Route::resource('bill', 'BillController')->middleware('auth:api');

/**
 * LOGIN
 * api/login dạng POST gồm email và password sẽ đăng nhập thành công và trả về TOKEN
 * api/details dạng POST để lấy thông tin người đăng nhập
 */

Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@register');
Route::post('details', 'API\UserController@details')->middleware('auth:api');

// Login - Truyền Email và Password theo dạng POST
// Route::post('login', 'UserController@postLogin');

// Forgot password - Truyền Email theo dạng POST
// Route::post('forgot', 'ResetPasswordController@postSend');

// Get email when use function Forgot Password - Truyền tham số token
// Route::post('getEmail', function(Request $request){
//     $token = $request->get('token');
//     $emails = DB::table('password_resets')->get();
//     foreach($emails as $email){
//         if (password_verify($token, $email->token)){
//             return $email->email;
//         }
//     }
// });


/**
 * Gửi mail
 */
// Send mail birthday - Truyền email theo dạng POST
Route::post('mailhpbd', ['uses' => 'MailController@sendMail', 'as' => 'postlienhe'])->middleware('auth:api');

// Get customers who have birthdays in next 1 days
// Route::get('hpbd', 'CustomerController@customerHPBD');

// Send mail marketing - Truyền (email(*), title(*), body(*))
Route::post('mailmarketing', 'MailController@sendMarketing')->middleware('auth:api');