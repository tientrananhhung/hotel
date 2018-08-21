<?php

namespace App\Http\Controllers;

use App\Order;
use App\Customer;
use App\Room;
use App\User;
use App\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Response;
use Carbon\Carbon;
use DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get all order
        $orders = Order::all();
        foreach($orders as $order){
            $order->data = json_decode($order->data);
            $order->customer_id = Customer::find($order->customer_id);
            $order->room_id = Room::find($order->room_id);
            $order->user_id = User::find($order->user_id);
        }

        //return list user by json
        return Response::json($orders, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
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
            'from.required'      => 'You must choose date to this field.',
            'to.required'        => 'You must choose date to this field.',
            'from_rent.required' => 'You must choose date to this field.'
        ];

        $validation = [
            'from'      => 'required',
            'to'        => 'required',
            'from_rent' => 'required',
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            //get value order and save into database
            if($request->has('service')){
                $services = Service::whereIn('id',$request->get('service'))->get();
            }else{
                $services = [];
            }
            
            $room = Room::find($request->get('room_id'));
            $data = [
                'services' => $services,
                'room' => $room
            ];

            $order = new Order;
            $order->from = $request->get('from');
            $order->to = $request->get('to');
            $order->data = json_encode($data);
            $order->from_rent = $request->get('from_rent');
            $order->customer_id = $request->get('customer_id');
            $order->user_id = $request->get('user_id');
            $order->room_id = $request->get('room_id');
            // $order->created_at = Carbon::now()->toDateTimeString();
            $order->status = $request->get('status');
            $order->save();
            $room = Room::find($order->room_id);
            $room->status = 0;
            $room->save();
            return response()->json(['order' => $order, 'success' => true]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Find a order
        $order = Order::find($id);

        if($order == null){
            return response()->json(array('success' => false));
        }else{
            $order->data = json_decode($order->data);

            $customer = Customer::find($order->customer_id);
            $room = Room::find($order->room_id);
            $user = User::find($order->user_id);

            $order->customer_id = $customer;
            $order->room_id = $room;
            $order->user_id = $user;
        }
        // return $order;
        return response()->json(['order' => $order, 'success' => true]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //Custom Notification
        $messages = [
            'from.required'      => 'You must choose date to this field.',
            'to.required'        => 'You must choose date to this field.',
            'from_rent.required' => 'You must choose date to this field.'
        ];

        $validation = [
            'from'      => 'required',
            'to'        => 'required',
            'from_rent' => 'required',
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            //get value order and update into database
            $order = Order::find($id);

            if($order != null){
                $services = Service::whereIn('id',$request->get('service'))->get();
                $room = Room::find($request->get('room_id'));
                $data = [
                    'services' => $services,
                    'room' => $room
                ];

                $order->from = $request->get('from');
                $order->to = $request->get('to');
                $order->data = json_encode($data);
                $order->from_rent = $request->get('from_rent');
                $order->customer_id = $request->get('customer_id');
                $order->user_id = $request->get('user_id');
                $order->room_id = $request->get('room_id');
                $order->created_at = $request->get('created_at');
                $order->updated_at = Carbon::now()->toDateTimeString();
                $order->save();
            }
            return response()->json(['order' => $order, 'success' => true]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // find a order and delete it in database
        $order = Order::find($id);
        if($order == null){
            return response()->json(array('success' => false));
        }else{
            $order->delete();
            return response()->json(array('success' => true));
        }
    }

    // Paging for Order
    public function pagination(){
        $order = Order::paginate(10);
        return $order;
    }

    // Find order by customer's name
    public function find_by_name($keyword){
        $customers = Customer::where('name', 'like', '%'.$keyword.'%')->get();
        if($customers->isEmpty()){
            return response()->json(array('success' => false));
        }else{
            foreach($customers as $customer){
                $cId[] = $customer->id;
            }

            $orders = Order::whereIn('user_id', $cId)
            ->where('status', 'LIKE', '%Đang%')
            ->get();

            if(empty($orders)){
                return response()->json(['success' => false]);
            }else{
                $orders->makeHidden(['id', 'updated_at']);
                foreach($orders as $order){
                    $order->data = json_decode($order->data);
                    $order->customer_id = Customer::find($order->customer_id);
                    $order->user_id = User::find($order->user_id);
                    $order->room_id = Room::find($order->room_id);
                }
                return $orders;
            }
        }
        // return $customers;
    }
}
