<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Response;
use Mail;
use App\Mail\HappyBirthdayMailable;

class MailController extends Controller
{
    public function sendMail(Request $request){
        $customer = Customer::where('email', $request->get('email'))->first();
        if($customer == null){
            return response()->json(['message' => 'This customer dont have email', 'success' => false]);
        }else{
            // Mail::send('mailbirthday', ['name'=>$customer->name], function($message){
            //     $message->from('hoctrokt@gmail.com', 'Khách sạn ABC');
            //     $message->to($customer->email, $customer->name)->subject('Khách sạn ABC chúc mừng sinh nhật quý khách');
            //     // $message->to('tien.trananhhung@gmail.com', 'Tiến')->subject('Khách sạn ABC chúc mừng sinh nhật quý khách');
            // });
            // return $customer;
            Mail::to($customer->email)->send(new HappyBirthdayMailable($customer));
            return response()->json(['message' => 'Send email completed', 'success' => true]);
        }
    }
}
