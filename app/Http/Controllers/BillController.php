<?php

namespace App\Http\Controllers;

use App\Bill;
use App\Order;
use App\Customer;
use App\User;
use App\Room;
use App\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Response;
use Carbon\Carbon;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get all bill
        $bills = Bill::all();
        foreach($bills as $bill){
            $bill->order_id = Order::find($bill->order_id);
            $bill->order_id->data = json_decode($bill->order_id->data);
            $bill->order_id->customer_id = Customer::find($bill->order_id->customer_id);
            $bill->order_id->user_id = User::find($bill->order_id->user_id);
            $bill->order_id->room_id = Room::find($bill->order_id->room_id);
        }

        //return list user by json
        return Response::json($bills, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
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
        //get value bill and save into database
        $bill = new Bill;
        $bill->to = Carbon::now()->toDateTimeString();
        $bill->discount = $request->get('discount');
        $bill->total = $request->get('total');
        $bill->order_id = $request->get('order_id');
        $bill->save();
        return response()->json(array('success' => true));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Bill  $bill
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Find a bill
        $bill = Bill::find($id);
        if($bill == null){
            return response()->json(array('success' => false));
        }else{
            $bill->order_id = Order::find($bill->order_id);
            $bill->order_id->data = json_decode($bill->order_id->data);
            $bill->order_id->customer_id = Customer::find($bill->order_id->customer_id);
            $bill->order_id->user_id = User::find($bill->order_id->user_id);
            $bill->order_id->room_id = Room::find($bill->order_id->room_id);
        }
        return response()->json(['bill' => $bill, 'success' => true]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Bill  $bill
     * @return \Illuminate\Http\Response
     */
    public function edit(Bill $bill)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Bill  $bill
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //get value bill and update into database
        $bill = Bill::find($id);
        $bill->discount = $request->get('discount');
        $bill->total = $request->get('total');
        $bill->save();
        return response()->json(array('success' => true));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Bill  $bill
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // find a bill and delete it in database
        $bill = Bill::find($id);
        if($bill == null){
            return response()->json(array('success' => false));
        }else{
            $bill->delete();
            return response()->json(array('success' => true));
        }
    }
}
