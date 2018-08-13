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
            Mail::to($customer->email)->send(new HappyBirthdayMailable($customer));
            return response()->json(['message' => 'Send email completed', 'success' => true]);
        }
    }
}
