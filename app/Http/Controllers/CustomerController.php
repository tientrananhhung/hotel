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
        //return a list customers
        $customer = Customer::all();

        return $customer;
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
        //Custom Notification
        $messages = [
            'name.required'          => 'You must enter name to this field.',
            'phone.required'         => 'You must enter phone number to this field.',
            'phone.min'              => 'You must enter the correct phone number to this field.',
            'phone.unique'           => 'this phone number exists.',
            'identity_card.required' => 'You must enter identity card to this field.',
            'identity_card.unique'   => 'this Identity_card exists.'
        ];

        $validation = [
            'name'          => 'required',
            'phone'         => 'required|min:10|unique:customers',
            'identity_card' => 'required|unique:customers'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            // get value customer and save into database
            $customer = new Customer;
            $customer->name = $request->get('name');
            $customer->birthday = $request->get('birthday');
            $customer->address = $request->get('address');
            $customer->phone = $request->get('phone');
            $customer->identity_card = $request->get('identity_card');
            $customer->count = $request->get('count');
            $customer->note = $request->get('note');
            $customer->email = $request->get('email');
            $customer->save();
            return response()->json(['customer' => $customer, 'success' => true]);
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
        //Find a order
        $customer = Customer::find($id);

        if($customer == null){
            return response()->json(array('success' => false));
        }
        // return $order;
        return response()->json(['customer' => $customer, 'success' => true]);
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
        //Custom Notification
        $messages = [
            'name.required'          => 'You must enter name to this field.',
            'phone.required'         => 'You must enter phone number to this field.',
            'phone.min'              => 'You must enter the correct phone number to this field.',
            'identity_card.required' => 'You must enter identity card to this field.'
        ];

        $validation = [
            'name'          => 'required',
            'phone'         => 'required|min:10',
            'identity_card' => 'required'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            //get value customer and update into database
            $customer = Customer::find($id);
            if($customer == null){
                return response()->json(array('success' => false));
            }else{
                $customer->fill($request->all())->save();
                return response()->json(['customer' => $customer, 'success' => true]);
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
            return response()->json(array('success' => false));
        }else{
            $customer->delete();
            return response()->json(array('success' => true));
        }
    }

    // Phân trang
    public function pagination(){
        $customer = Customer::paginate(10);
        return $customer;
    }

    //find by name or email
    public function find($keyword){
        $customers = DB::table('customers')->where('email', 'like', '%'.$keyword.'%')->orwhere('name', 'like', '%'.$keyword.'%')->get();
        if($customers == null){
            return response()->json(array('success' => false));
        }else{
            return response()->json(['customers' => $customers, 'success' => true]);
        }
    }
}
