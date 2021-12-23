<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function index(){

        $view =  Post::all();
        if($view){
            return response()->json([
                'status' => 200,
                'post'=> $view,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'post'=> 'No Data Found',
            ]);
        }
        

    }

    public function srchPost($id){

        $findPost =  Post::find($id);
        if($findPost){
            return response()->json([
                'status' => 200,
                'post'=> $findPost,
            ]);
        }else{
            return response()->json([
                'status' => 504,
                'message'=> "Not found any data",
            ]);
        }
        

    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
            'title'=>'required',
            'description' => 'required',
            'category' => 'required',
        ]);
         
        if($validator->fails()){

            return response()->json([
                'status' => 400,
                'validation_errors' => $validator->messages(),
            ]);

        }else{

            $updatePost = Post::find($id);
            if($updatePost){
                $updatePost->title = $request -> input('title');
                $updatePost->description = $request -> input('description');
                $updatePost->category = $request -> input('category');
                $updatePost->save();
                return response()->json([
                    'status' => 200,
                    'message'=> 'Post Updated Successfully',
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message'=> 'No Record Found',
                ]); 
            }
            
        }

        

    }

    public function addPost($userid,Request $request){


        $validator = Validator::make($request->all(),[
            'title'=>'required',
            'description' => 'required',
            'category' => 'required',
        ]);
         
        if($validator->fails()){

            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);

        }else{

            $addPost = new Post();
            $addPost->title = $request -> input('title');
            $addPost->description = $request -> input('description');
            $addPost->category = $request -> input('category');
            $addPost->userid = $userid;
            $addPost->save();
            return response()->json([
                'status' => 200,
                'message'=> 'Post Added Successfully',
            ]);
        }

    }

    public function deletePost($id){

        $delete = Post::find($id);
        if($delete){
            
            $delete->delete();
            return response()->json([
                'status' => 200,
                'message'=> 'Post Deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message'=> 'No id found',
            ]); 
        }

    }

    public function fetchPostCategory($category){

        $fetch = Post::where('category',$category)->get();
        if($fetch ){

            return response()->json([
                'status' => 200,
                'post'=> $fetch ,
            ]); 

        }else{

            return response()->json([
                'status' => 400,
                'message'=> 'There has no post releated category',
            ]); 

        }
    }

    public function userPost($userid){

        $fetchPost = Post::where('userid',$userid)->get();
        if($fetchPost ){

            return response()->json([
                'status' => 200,
                'post'=> $fetchPost ,
            ]); 

        }else{

            return response()->json([
                'status' => 400,
                'message'=> 'There has no post',
            ]); 

        }

    }
}
