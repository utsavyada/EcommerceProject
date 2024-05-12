<?php

namespace App\Http\Controllers;

use App\Models\Cartitem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addTocart(Request $req)
    {
        $cartitem = new Cartitem;
        $cartitem->user_id = $req->input('user_id');
        $cartitem->product_id = $req->input('product_id');
        $cartitem->email = $req->input('email');
        $cartitem->save();
        return $cartitem;
    }

    public function removeCart(Request $req)
    {
        $product_id = $req->input('product_id');
        $user_id = $req->input('user_id');
        $cartitem = Cartitem::where('user_id', $user_id)
            ->where('product_id', $product_id)
            ->first();
        if (!$cartitem) {
            return response()->json([
                'status' => 'error',
                'message' => 'Item not found',
            ], 404);
        }
        $cartitem->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Item deleted successfully',
        ]);
    }
}