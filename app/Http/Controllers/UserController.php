<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
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
        $users = User::all();

        //return list user by json
        return Response::json($users, 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
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
            'birthday.required'     => 'You must choose date to this field.',
            'phone.required'        => 'You must enter phone number to this field.',
            'phone.min'             => 'You must enter the correct phone number to this field.',
            'address.required'      => 'You must enter address to this field.',
            'email.required'        => 'You must enter email to this field.',
            'email.email'           => 'You must enter the correct email to this field.',
            'password.required'     => 'You must enter password to this field.'
        ];

        $validation = [
            'name'      => 'required',
            'birthday'  => 'required',
            'phone'     => 'required|min:10',
            'address'   => 'required',
            'email'     => 'required|email',
            'password'  => 'required'
        ];

        $validator = Validator::make($request->all(),$validation,$messages);

        //return message by json if validation false
        if($validator->fails()){
            $response = array('messages' => $validator->messages(), 'success' => false);
            return $response;
        }else{
            //get value user and save into database
            $user = new User;
            $user->name = $request->get('name');
            $user->birthday = $request->get('birthday');
            $user->address = $request->get('address');
            $user->phone = $request->get('phone');
            $user->email = $request->get('email');
            $user->password = bcrypt($request->get('password'));
            $user->isadmin = $request->get('isadmin');
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
            'name.required'         => 'You must enter name to this field.',
            'birthday.required'     => 'You must choose date to this field.',
            'phone.required'        => 'You must enter phone number to this field.',
            'phone.min'             => 'You must enter the correct phone number to this field.',
            'address.required'      => 'You must enter address to this field.',
            'email.required'        => 'You must enter email to this field.',
            'email.email'           => 'You must enter the correct email to this field.',
            'password.required'     => 'You must enter password to this field.'
        ];

        $validation = [
            'name'      => 'required',
            'birthday'  => 'required',
            'phone'     => 'required|min:10',
            'address'   => 'required',
            'email'     => 'required|email',
            'password'  => 'required'
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

    public function pagination(){
        $users = User::paginate(10);

        // $users->withPath('user/url');
        
        return $users;
    }

    //find by name or email
    public function find($keyword){
        $users = DB::table('users')->where('email', 'like', '%'.$keyword.'%')->orwhere('name', 'like', '%'.$keyword.'%')->get();
        if($users == null){
            return response()->json(array('success' => false));
        }else{
            return response()->json(['users' => $users, 'success' => true]);
        }
    }

    public function getLogin(){
        return view('dangnhap');
    }

    public function postLogin(Request $request){
        if(Auth::attempt(['email'=>$request['email'], 'password'=>$request['password']])){
            return redirect('list');
        }else{
            return redirect('login');
        }
    }

    public function logout(){
        Auth::logout();
        return redirect('login');
    }
}
