<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\User;
use App\Reset;
use stdClass;
use Mail;
use App\Mail\ResetPasswordMailable;

class ResetPasswordController extends Controller
{
    //Send a email for member
    public function postSend(Request $request)
    {
        $user = User::where('email', $request->get('email'))->first();
        if($user == null){
            return response()->json(['message' => 'Địa chỉ Email không tồn tại', 'success' => false]);
        }else{
            $reset = new Reset;
            $reset->email = $request->get('email');
            $reset->token = $request->get('token');
            $reset->created_at = Carbon::now()->toDateTimeString();
            $reset->save();
            $a = new stdClass;
            $a->email = $request->get('email');
            $a->token = $request->get('token');
            $a->name = $user->name;
            // Mail::to($user->email)->send(new ResetPasswordMailable(['reset' => $reset, 'user' => $user]));
            // return response()->json(['message' => 'Một Email đặt lại mật khẩu đã được gửi đến email của bạn, xin vui lòng kiểm tra email', 'success' => true]);
            return $a;
        }
    }
}