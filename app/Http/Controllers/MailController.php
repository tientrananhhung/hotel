<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Response;
use Mail;
use App\Mail\HappyBirthdayMailable;
use App\Mail\MarketingMailable;

class MailController extends Controller
{
    public function sendMail(Request $request)
    {
        //Custom Notification
        $messages = [
            'email.required' => 'You must enter email to this field.',
            'email.email'    => 'You must enter the correct email to this field.',
        ];

        $validation = [
            'email' => 'required|email'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            $customer = Customer::where('email', $request->get('email'))->first();
            if($customer == null){
                return response()->json(['message' => 'This customer dont have email', 'success' => false]);
            }else{
                Mail::to($customer->email)->send(new HappyBirthdayMailable($customer));
                return response()->json(['message' => 'Send email completed', 'success' => true]);
            }
        }
    }

     public function sendMarketing(Request $request)
     {
        //Custom Notification
        $messages = [
            'email.required'     => 'You must enter email to this field.',
            'email.email'        => 'You must enter the correct email to this field.',
            'title.required'     => 'You must enter title to this field.',
            'body.required'      => 'You must enter body to this field.',
        ];

        $validation = [
            'email' => 'required|email',
            'title' => 'required',
            'body'  => 'required'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            $customer = Customer::where('email', $request->get('email'))->first();
            if($customer == null){
                return response()->json(['message' => 'This customer dont have email', 'success' => false]);
            }else{
                $content = collect(['title'=>$request->get('title'), 'body'=>$request->get('body'), 'customer'=>$customer])->all();
                Mail::to($customer->email)->send(new MarketingMailable($content));
                return response()->json(['message' => 'Send email completed', 'success' => true]);
            }
        }
    }
}