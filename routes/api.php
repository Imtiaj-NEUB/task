<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PostController;

Route::post('signin',[AuthController::class,'signIn']);
Route::post('signup',[AuthController::class,'signUp']);
Route::get('post',[PostController::class,'index']);
Route::get('srchpost/{id}',[PostController::class,'srchPost']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('addpost',[PostController::class,'addPost']);
    Route::put('update/{id}',[PostController::class,'update']);
    Route::delete('deletepost/{id}',[PostController::class,'deletePost']);
    Route::post('signout',[AuthController::class,'signOut']);
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
