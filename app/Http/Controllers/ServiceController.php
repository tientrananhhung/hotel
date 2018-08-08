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
        //get all user
        $services = Service::all();

        //return list user by json
        return Response::json($services, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
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
            'name.required'         => 'You must enter name to this field.',
            'price.required'     => 'You must enter price to this field.'
        ];

        $validation = [
            'name'        => 'required',
            'price'       => 'required'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            //get value services and save into database
            $service = Service::create($request->all());
            return response()->json(['service' => $service, 'success' => true]);
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
            return response()->json(array('success' => false));
        }
        return response()->json(['service' => $service, 'success' => true]);
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
            'name.required'         => 'You must enter name to this field.',
            'price.required'     => 'You must enter price to this field.'
        ];

        $validation = [
            'name'        => 'required',
            'price'       => 'required'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            //get value user and update into database
            $service = Service::findOrFail($id);
            $service->fill($request->all())->save();
            return response()->json(['service' => $service, 'success' => true]);
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
            return response()->json(array('success' => false));
        }else{
            $service->delete();
            return response()->json(array('success' => true));
        }
    }
}
