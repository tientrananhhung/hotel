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
        try{
            // get all user
            $keyword = request()->query('keyword');
            $limit = request()->query('limit');
            $data = Service::when($keyword, function ($query) use ($keyword) {
                $query->where('name', 'LIKE', "%$keyword%");
            })->paginate($limit);
            return response()->json($data, 200);
        }catch(\Exception $e){
            return response()->json($e->getMessage(), 500);
        }
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
        try{
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
                $response = array('message' => $validator->messages());
                return $response;
            }else{
                //get value services and save into database
                $service = Service::create($request->all());
                return response()->json($service, 201);
            }
        }catch(\Exception $e){
            return response()->json($e->getMessage(), 500);
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
        try{
            //Find a user
            $service = Service::find($id);
            if($service == null){
                return response()->json(array('message' => 'This service doesn\'t exists'), 404);
            }else{
                return response()->json($service, 200);
            }
        }catch(\Exception $e){
            return response()->json($e->getMessage(), 500);
        }
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
        try{
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
                $response = array('message' => $validator->messages());
                return $response;
            }else{
                //get value user and update into database
                $service = Service::find($id);
                if($service == null){
                    return response()->json(['message' => 'This service doesn\'t exists'], 404);
                }else{
                    $service->fill($request->all())->save();
                    return response()->json($service, 201);
                }
            }
        }catch(\Exception $e){
            return response()->json($e->getMessage(), 500);
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
        try{
            // find a service and delete it in database
            $service = Service::find($id);
            if($service == null){
                return response()->json(['message' => 'This service doesn\'t exists'], 404);
            }else{
                $service->delete();
                return response()->json(['message' => 'This service deleted'], 201);
            }
        }catch(\Exception $e){
            return response()->json($e->getMessage(), 500);
        }
    }
}