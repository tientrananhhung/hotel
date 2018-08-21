<?php

namespace App\Http\Controllers;

use App\Room;
use App\Order;
use App\User;
use App\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Arr;
use Response;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get all room
        $rooms = Room::all();

        //return list room by json
        return Response::json($rooms, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
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
            'name.required'   => 'You must enter name to this field.',
            'type.required'   => 'You must enter room type to this field.',
            'status.required' => 'You must choose status to this field.',
            'price.required'  => 'You must enter price to this field.',
        ];

        $validation = [
            'name'   => 'required',
            'type'   => 'required',
            'status' => 'required',
            'price'  => 'required'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            //get value user and save into database
            $room = Room::create($request->all());
            return response()->json(['room' => $room, 'success' => true]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Find a room
        $room = Room::find($id);
        if($room == null){
            return response()->json(array('success' => false));
        }
        return response()->json(['room' => $room, 'success' => true]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //Custom Notification
        $messages = [
            'name.required'   => 'You must enter name to this field.',
            'type.required'   => 'You must enter room type to this field.',
            'status.required' => 'You must choose status to this field.',
            'price.required'  => 'You must enter price to this field.',
        ];

        $validation = [
            'name'   => 'required',
            'type'   => 'required',
            'status' => 'required',
            'price'  => 'required'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            //get value room and update into database
            $room = Room::find($id);
            if($room == null){
                return response()->json(array('success' => false));
            }else{
                $room->fill($request->all())->save();
                return response()->json(['room' => $room, 'success' => true]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // find a room and delete it in database
        $room = Room::find($id);
        if($room == null){
            return response()->json(array('success' => false));
        }else{
            $room->delete();
            return response()->json(array('success' => true));
        }
    }

    // Paging for Rooms
    public function pagination(){
        $room = Room::paginate(10);
        return $room;
    }

    // Get list rooms booked
    public function getRoomBooked(){
        $rooms = Room::where('status', '0')->get();
        return response()->json($rooms);
    }

    // Get list room book
    public function getRoomBook(){
        $rooms = Room::where('status', '1')->get();
        return response()->json($rooms);
    }

    // Find room by date
    public function postRoomByDate(Request $request){
        $from = $request->get('from');
        $to = $request->get('to');
        $orders = Order::whereBetween('from', [$from, $to])
        ->orWhereBetween('to', [$from, $to])
        ->where('status', 'LIKE', '%Đang%')
        ->get()->pluck('room_id');
        
        // $a = $orders->pluck('room_id');
        $rooms = Room::orderBy('status', 'DESC')->get();
        $empty = $rooms->whereNotIn('id', $orders);
        return $empty;
    }

    // Find room by name
    public function find($keyword){
        $rooms = Room::where('name', 'like', '%'.$keyword.'%')->orwhere('type', 'like', '%'.$keyword.'%')->get();
        if($room->isEmpty()){
            return response()->json(array('success' => false));
        }else{
            return response()->json(['rooms' => $rooms, 'success' => true]);
        }
    }
}