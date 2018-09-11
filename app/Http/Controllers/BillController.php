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
        $keyword = request()->query('keyword');
        $limit = request()->query('limit');
        $data = Bill::whereHas('order', function ($query) use ($keyword) {
            $query->whereHas('customer', function($q) use ($keyword){
                $q->where('name', 'LIKE', "%$keyword%")
                ->orwhere('email', 'LIKE', "%$keyword%")
                ->orwhere('phone', 'LIKE', "%$keyword%")
                ->orwhere('identity_card', 'LIKE', "%$keyword%");
            });
        })->with('order', 'order.customer', 'order.user', 'order.room')->paginate($limit);
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
            'order_id.required'  => 'You must choose order to this field.',
            'order_id.exists'    => 'This Order doesn\'t exists.',
            'to.required'        => 'You must choose date to this field.',
            'to.date'            => 'You must choose date to this field.',
            'discount.required'  => 'You must set value for discount.',
            'discount.numeric'   => 'You must set value is number.',
        ];

        $validation = [
            'order_id'  => 'required|exists:orders,id',
            'to'        => 'required|date',
            'discount'  => 'required|numeric'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages());
            return $response;
        }else{
            if(empty(Bill::where('order_id', $request->order_id)->first())){

                $order = Order::with('room', 'user', 'customer')->find($request->order_id);

                // Tổng số ngày ở
                $totalDay = Carbon::parse($request->to)->diffInDays(Carbon::parse($order->from));

                // Tổng giá dịch vụ
                $s = 0;

                if(!empty($order->data->services)){
                    foreach($order->data->services as $service){
                        $s = $s + $service->price;
                    }
                }
                
                // Tổng tiền
                $total = ($totalDay * $order->room->price + $s) - $request->discount;

                $bill = new Bill;
                $request->request->add(['total' => $total]);
                // $bill->fill($request->all())->save();
                $bill = Bill::create($request->all());
                $bill->order()->update([
                    'status' => 'Đã Thanh Toán'
                ]);
                return response()->json($bill);
            }else{
                return response()->json(['message' => 'paymented order']);
            }
            
        }
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
        $bill = Bill::with('order', 'order.customer', 'order.user', 'order.room')->find($id);
        if(!$bill){
            return response()->json(['message' => 'This bill doesn\'t exists']);
        }else{
            return response()->json($bill);
        }
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
        //Custom Notification
        $messages = [
            'order_id.exists'   => 'This Order doesn\'t exists.',
            'order_id.required' => 'You must choose order to this field.',
            'to.required'       => 'You must choose date to this field.',
            'to.date'           => 'You must choose date to this field.',
            'discount.numeric'  => 'You must enter the correct discount to this field.',
        ];

        $validation = [
            'order_id'  => 'required|exists:orders,id',
            'to'        => 'required|date',
            'discount'  => 'numeric'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages());
            return $response;
        }else{
            $bill = Bill::find($id);
            if($bill == null){
                return response()->json(array('message' => 'This bill doesn\'t exists'));
            }else{
                $order = Order::with('room', 'user', 'customer')->find($request->order_id);

                $totalDay = Carbon::parse($request->to)->diffInDays(Carbon::parse($order->from_rent));

                $s = 0;

                if(!empty($order->data->services)){
                    foreach($order->data->services as $service){
                        $s = $s + $service->price;
                    }
                }
                
                $total = ($totalDay * $order->room->price + $s) - $request->discount;

                $request->request->add(['total' => $total]);
                $bill->fill($request->all())->save();
                return response()->json($bill);
            }
        }
        
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
            return response()->json(array('message' => 'This bill doesn\'t exists'));
        }else{
            $bill->delete();
            return response()->json(array('message' => 'This bill deleted'));
        }
    }
}