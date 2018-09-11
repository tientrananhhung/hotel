<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Response;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // get all user
        $keyword = request()->query('keyword');
        $limit = request()->query('limit');
        $data = Service::when($keyword, function ($query) use ($keyword) {
            $query->where('name', 'LIKE', "%$keyword%");
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
        //Custom Notification
        $messages = [
            'name.required'  => 'You must enter name to this field.',
            'price.required' => 'You must enter price to this field.',
            'price.numeric'  => 'You must enter price to this field.'
        ];

        $validation = [
            'name'   => 'required',
            'price'  => 'required|numeric',
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages());
            return $response;
        }else{
            //get value services and save into database
            $service = Service::create($request->all());
            return response()->json($service);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Find a user
        $service = Service::find($id);
        if($service == null){
            return response()->json(array('message' => 'This service doesn\'t exists'));
        }
        return response()->json($service);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //Custom Notification
        $messages = [
            'name.unique'   => 'This service exists.',
            'name.min'      => 'You must enter name to this field.',
            'price.numeric' => 'You must enter price to this field.'
        ];

        $validation = [
            'name'  => 'min:1|unique:services,name',
            'price' => 'numeric'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages());
            return $response;
        }else{
            //get value user and update into database
            $service = Service::find($id);
            if($service == null){
                return response()->json(array('message' => 'This service doesn\'t exists'));
            }else{
                $service->fill($request->all())->save();
                return response()->json($service);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // find a service and delete it in database
        $service = Service::find($id);
        if($service == null){
            return response()->json(array('message' => 'This service doesn\'t exists'));
        }else{
            $service->delete();
            return response()->json(array('message' => 'This service deleted'));
        }
    }
}