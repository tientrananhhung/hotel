<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Response;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return a list customers
        $keyword = request()->query('keyword');
        $limit = request()->query('limit');
        $data = Customer::when($keyword, function ($query) use ($keyword) {
            $query->where('name', 'LIKE', "%$keyword%")
            ->orwhere('email', 'LIKE', "%$keyword%")
            ->orwhere('identity_card', 'LIKE', "%$keyword%")
            ->orwhere('phone', 'LIKE', "%$keyword%");
        })->paginate($limit);
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Custom Notification
        $messages = [
            'name.required'          => 'You must enter name to this field.',
            'birthday.date'          => 'You must choose date to this field',
            'phone.required'         => 'You must enter phone number to this field.',
            'phone.numeric'          => 'You must enter the correct phone number to this field.',
            'phone.min'              => 'You must enter the correct phone number to this field.',
            'phone.unique'           => 'this phone number exists.',
            'identity_card.required' => 'You must enter identity card to this field.',
            'identity_card.numeric'  => 'You must enter the correct identity card to this field.',
            'identity_card.unique'   => 'this Identity_card exists.',
            'email.email'            => 'You must enter the correct email to this field.',
            'email.unique'           => 'This email exists.'
        ];

        $validation = [
            'name'          => 'required',
            'birthday'      => 'date',
            'phone'         => 'required|numeric|min:10|unique:customers,phone',
            'identity_card' => 'required|numeric|unique:customers,identity_card',
            'email'         => 'email|unique:customers,email'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        // return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages());
            return $response;
        }else{
            // get value customer and save into database
            $customer = Customer::create($request->all());
            return response()->json($customer);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Find a order
        $customer = Customer::find($id);

        if($customer == null){
            return response()->json(['message' => 'This customer does\'t exists']);
        }
        return response()->json($customer);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Custom Notification
        $messages = [
            'phone.numeric'         => 'You must enter the correct phone number to this field.',
            'phone.min'             => 'You must enter the correct phone number to this field.',
            'phone.unique'          => 'This phone number exists.',
            'identity_card.numeric' => 'You must enter the correct Identity Card to this field.',
            'identity_card.unique'  => 'This Identity card exists.',
            'birthday.date'         => 'You must choose a date to this field.',
            'email.email'           => 'You must enter the correct email to this field.',
            'name.min'              => 'This field is not null',
        ];

        $validation = [
            'phone'         => 'numeric|min:10|unique:customers,phone',
            'identity_card' => 'numeric|unique:customers,identity_card',
            'birthday'      => 'date',
            'email'         => 'email',
            'name'          => 'min:1'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        // return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages());
            return $response;
        }else{
            // get value customer and update into database
            $customer = Customer::find($id);
            if($customer == null){
                return response()->json(['message' => 'This customer does\'t exists']);
            }else{
                $customer->fill($request->all())->save();
                return response()->json($customer);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // find a customer and delete it in database
        $customer = Customer::find($id);
        if($customer == null){
            return response()->json(array('message' => 'This customer does\'t exists'));
        }else{
            $customer->delete();
            return response()->json(array('message' => 'This customer deleted'));
        }
    }

    // Get customers who have birthdays in next 1 days
    // public function customerHPBD(){
    // Current day
    //     $start = date('z') + 1;
    //     // end range 7 days from now
    //     $end = date('z') + 1 + 1;
    //     $customers = Customer::whereRaw("DAYOFYEAR(birthday) BETWEEN $start AND $end")->orderBy('birthday', 'ASC')->get();
    //     return $customers;
    // }

}
