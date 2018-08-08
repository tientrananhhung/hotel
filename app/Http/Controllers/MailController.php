<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use DB;

class MailController extends Controller
{
    // public function happyBirthday(Request $request)
    // {
    //     // $content = 'Thay mặt khách sạn ABC - K79/H20/4 Võ Duy Ninh, Sơn Trà, Đà Nẵng. Kinh chúc quý khách sinh nhật vui vẻ, vạn sự như ý, gia đình hạnh phúc và đạt được nhiều thành công trong cuộc sống';
    //     $input = $request->all();
    //     Mail::send('mailbirthday', array('name'=>$input["name"],'email'=>$input["email"], 'content'=>$input['comment']), function($message){
	//         $message->to('hoctrokontum@gmail.com', 'Khách sạn ABC chúc mừng sinh nhật')->subject('Chúc mừng sinh nhật!');
	//     });
    //     Session::flash('flash_message', 'Send message successfully!');

    //     return view('form');
    // }

    public function sendMail(){
        $data = ['hoten', 'Tran Anh Hung Tien'];
        Mail::send('mailbirthday', $data, function($message){
            $message->from('hoctrokt@gmail.com', 'Khách sạn ABC');
            $message->to('tien.trananhhung@gmail.com', 'Tiến')->subject('Khách sạn ABC chúc mừng sinh nhật quý khách');
        });
    }
}
