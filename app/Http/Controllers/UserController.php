<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get all user
        $keyword = request()->query('keyword');
        $limit = request()->query('limit');
        $data = User::when($keyword, function ($query) use ($keyword) {
            $query->where('name', 'LIKE', "%$keyword%")
            ->orwhere('email', 'LIKE', "%$keyword%");
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
            'name.required'         => 'You must enter name to this field.',
            'birthday.date'         => 'You must choose date to this field.',
            'phone.required'        => 'You must enter phone number to this field.',
            'phone.min'             => 'You must enter the correct phone number to this field.',
            'phone.numeric'         => 'You must enter the correct phone number to this field.',
            'phone.unique'          => 'This phone number exists.',
            'email.required'        => 'You must enter email to this field.',
            'email.email'           => 'You must enter the correct email to this field.',
            'email.unique'          => 'This email exists.',
            'password.required'     => 'You must enter password to this field.',
            'isadmin.required'      => 'You must set authority for this user.',
            'isadmin.boolean'       => '1 is administrator and 0 is not'
        ];

        $validation = [
            'name'      => 'required',
            'birthday'  => 'date',
            'phone'     => 'required|min:10|numeric|unique:users,phone',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required',
            'isadmin'   => 'required|boolean'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            //get value user and save into database
            $user = new User;
            $user->name = $request->name;
            $user->birthday = $request->birthday;
            $user->address = $request->address;
            $user->phone = $request->phone;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->isadmin = $request->isadmin;
            $user->save();
            return response()->json(['user' => $user, 'success' => true]);
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
        //Find a user
        $user = User::find($id);
        if($user == null){
            return response()->json(array('success' => false));
        }
        return response()->json(['user' => $user, 'success' => true]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
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
            'phone.min'             => 'You must enter the correct phone number to this field.',
            'phone.unique'          => 'This email exists.',
            'email.email'           => 'You must enter the correct email to this field.',
            'email.unique'          => 'This email exists.',
            'name.min'              => 'This field is not null',
            'isadmin.boolean'       => '1 is administrator and 0 is not'
        ];

        $validation = [
            'name'      => 'min:1',
            'phone'     => 'min:10|unique:users,phone',
            'email'     => 'email|unique:users,email',
            'isadmin'   => 'boolean'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            //get value user and update into database
            $user = User::find($id);
            if($user != null){
                $user->fill($request->all())->save();
                return response()->json(['user' => $user, 'success' => true]);
            }else{
                return response()->json(array('success' => false));
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
        // find a user and delete it in database
        $user = User::find($id);
        if($user == null){
            return response()->json(array('success' => false));
        }else{
            $user->delete();
            return response()->json(array('success' => true));
        }
    }

    // // Login
    // public function postLogin(Request $request){

    //     $remember = (Input::has('remember')) ? true : false;

    //     if(Auth::attempt(['email'=>$request->email, 'password'=>$request->password], $remember)){
    //         return response()->json(['user' => Auth::user(), 'success' => true]);
    //     }else{
    //         return response()->json(array('success' => false));
    //     }

    // }

    // // Logout
    // public function logout(){
    //     Auth::logout();
    //     return redirect('login');
    // }
}