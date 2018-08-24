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
        $keyword = request()->query('keyword');
        $limit = request()->query('limit');
        $data = Room::when($keyword, function ($query) use ($keyword) {
            $query->where('name', 'LIKE', "%$keyword%")
            ->orwhere('type', 'LIKE', "%$keyword%");
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

        if($request->has('from') && $request->has('to')){

            $messages1 = [
                'from.required' => 'You must choose date to this field.',
                'to.required'   => 'You must choose date to this field.',
                'from.date'     => 'You must choose date to this field.',
                'to.date'       => 'You must choose date to this field.',
            ];

            $validation1 = [
                'from'   => 'required|date',
                'to'     => 'required|date'
            ];

            $validator1 = Validator::make($request->all(),$validation1,$messages1);

            //return message by json if validation false
            if($validator1->fails()){
                $response = array('messages' => $validator1->messages(), 'success' => false);
                return $response;
            }else{
                $limit = request()->query('limit');
                $from = $request->get('from');
                $to = $request->get('to');

                $data = Room::whereDoesntHave('orders', function ($query) use($from, $to){
                    $query->whereBetween('from', [$from, $to])
                    ->orWhereBetween('to', [$from, $to])
                    ->where('status', 'LIKE', '%Đang%');
                })->paginate($limit);

                return $data;
            }

        }else {

            //Custom Notification
            $messages = [
                'name.required'   => 'You must enter name to this field.',
                'name.unique'     => 'This room\'s name exists.',
                'type.required'   => 'You must enter room type to this field.',
                'status.required' => 'You must choose status to this field.',
                'status.boolean'  => '0 is booked room and 1 is book room.',
                'price.required'  => 'You must enter price to this field.',
                'price.numeric'   => 'You must enter the correct price to this field.'
            ];

            $validation = [
                'name'   => 'required|unique:rooms,name',
                'type'   => 'required',
                'status' => 'required|boolean',
                'price'  => 'required|numeric'
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
            'name.unique'    => 'this room\'s name exists',
            'name.min'       => 'This field is not null',
            'status.boolean' => '0 is booked room and 1 is book room.',
            'type.min'       => 'This field is not null',
            'price.numeric'  => 'You must enter the correct price to this field.',
            'note.min'       => 'This field is not null'
        ];

        $validation = [
            'name'   => 'min:1|unique:rooms,name',
            'status' => 'boolean',
            'type'   => 'min:1',
            'price'  => 'numeric',
            'note'   => 'min:1'
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
    
}