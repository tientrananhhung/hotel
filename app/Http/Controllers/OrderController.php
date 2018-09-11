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
        $keyword = request()->query('keyword');
        $limit = request()->query('limit');
        $data = Order::whereHas('customer', function ($query) use ($keyword) {
            $query->where('name', 'LIKE', "%$keyword%")
            ->orwhere('email', 'LIKE', "%$keyword%")
            ->orwhere('phone', 'LIKE', "%$keyword%")
            ->orwhere('identity_card', 'LIKE', "%$keyword%");
        })->with('customer', 'user', 'room')->paginate($limit);
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
        //Custom Notification
        $messages = [
            'from.required'        => 'You must choose date to this field.',
            'to.required'          => 'You must choose date to this field.',
            'from.date'            => 'You must choose date to this field.',
            'to.date'              => 'You must choose date to this field.',
            'customer_id.required' => 'You must choose customer to this field.',
            'user_id.required'     => 'You must choose user to this field.',
            'room_id.required'     => 'You must choose room to this field.',
            'customer_id.exists'   => 'This Customer doesn\'t exists',
            'user_id.exists'       => 'This User doesn\'t exists',
            'room_id.exists'       => 'This Room doesn\'t exists',
            'service.exists'       => 'This Service doesn\'t exists',
            'status.required'      => 'You must enter status to this field.'
        ];

        $validation = [
            'from'        => 'required|date',
            'to'          => 'required|date',
            'customer_id' => 'required|exists:customers,id',
            'user_id'     => 'required|exists:users,id',
            'room_id'     => 'required|exists:rooms,id',
            'status'      => 'required',
            'service'     => 'exists:services,id'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages());
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

            $request->request->add(['data' => json_encode($data), 'from_rent' => $request->from]);
            $order = Order::with('customer', 'user', 'room')->create($request->all());
            $order->room()->update([
                'status' => '0'
            ]);
            return response()->json($order);
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
        $order = Order::with('customer', 'user', 'room')->find($id);

        if($order == null){
            return response()->json(array('message' => 'This order doesn\'t exists'));
        }else{
            return response()->json($order);
        }
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
            'from.date'          => 'You must choose date to this field.',
            'to.date'            => 'You must choose date to this field.',
            'service.exists'     => 'This Service doesn\'t exists',
            'from_rent.date'     => 'You must choose date to this field.',
            'customer_id.exists' => 'This Customer doesn\'t exists',
            'user_id.exists'     => 'This User doesn\'t exists',
            'room_id.required'   => 'You must choose room to this field.',
            'room_id.exists'     => 'This Room doesn\'t exists'
        ];

        $validation = [
            'from'        => 'date',
            'to'          => 'date',
            'service'     => 'exists:services,id',
            'from_rent'   => 'date',
            'customer_id' => 'exists:customers,id',
            'user_id'     => 'exists:users,id',
            'room_id'     => 'required|exists:rooms,id'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages());
            return $response;
        }else{
            //get value order and update into database
            $order = Order::with('customer', 'user', 'room')->find($id);

            if($order != null){
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
                $request->request->add(['data' => json_encode($data)]);
                $order->fill($request->all())->save();
                return response()->json($order);
            }else{
                return response()->json(['message' => 'This order doesn\'t exists']);
            }
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
            return response()->json(array('message' => 'This order doesn\'t exists'));
        }else{
            $order->delete();
            return response()->json(array('message' => 'This order deleted'));
        }
    }

}
