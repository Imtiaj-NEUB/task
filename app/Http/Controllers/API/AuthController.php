<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function signUp(Request $request){
        $validator = Validator::make($request->all(),[
           'name'=>'required',
           'email'=>'required|email|max:191|unique:users,email',
           'password' => 'required|max:6',
        ]);

        if($validator->fails()){

            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);

        }else{

            $user = User::create([
                'name'  => $request ->name,
                'email' => $request ->email,
                'password' => Hash::make($request ->password),
            ]);
            $token =  $user->createToken($user->email.'_Token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'token'  => $token,
                'userid' => $user->id,
                'message'=> 'Sign Up Successfully',

            ]);

        }
    }

    public function signIn(Request $request){
        $validator = Validator::make($request->all(),[
           'email'=>'required',
           'password' => 'required',
        ]);

        if($validator->fails()){

            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);

        }else{

            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message'=> 'Invalid Credentials',
    
                ]);
            }else{

                $token =  $user->createToken($user->email.'_Token')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'token'  => $token,
                    'userid' => $user->id,
                    'message'=> 'Signed In Successfully',

                ]);
            }
        }
    }

    public function signOut(){
      
       $user = request()->user();
       $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
       return response()->json([
            'status' => 200,
            'message'=> 'Sign Out Successfully',
       ]);
    }
    
}
