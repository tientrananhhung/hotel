<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Support\Facades\Auth;

class UserLoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        \Log::info(Auth::user());
        if(Auth::check()){
            $user = Auth::user();
            if($user->isadmin == 1){
                return $next($request);
            }else{
                return redirect('login');
            }
        }else{
            return redirect('login');
        }
    }
}
