<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\Cartitem;

class OrderController extends Controller
{
    public function store(Request $req)
    {
        $order = new Order;
        $order->user_id = $req->input('user_id');
        $order->product_id = $req->input('product_id');
        $order->qty = $req->input('qty');
        $order->price = $req->input('price');
        $order->email = $req->input('email');
        $order->total = $req->input('price') * $req->input('qty');
        $order->save();
        return $order;
    }

    public function calculateTotalByEmail(Request $request)
    {
        $email = $request->input('email');
        $total = Order::where('email', $email)->sum('total');
        return response()->json(['total' => $total]);
    }

    public function canceldelivery(Request $req)
    {
        $email = $req->input('email');
        Order::where('email', $email)->delete();
        return response()->json([
            'status' => 'sucess',
            'message' => 'delivery Cancelled'
        ]);
    }

    public function afterpurchase(Request $req)
    {
        $email = $req->input('email');
        Cartitem::where('email', $email)->delete();
        return response()->json([
            'status' => 'sucess',
            'message' => 'After Purchase product is removed from cart'
        ]);
    }

    //     public function deliveryitems(Request $req){
    //         // Update the payment_status to "paid" in Orders table
    //    }                                                           not for use

    public function cancelOrder(Request $request)
{
    $deliveryId = $request->input('delivery_id');
    $delivery = Delivery::where('id', $deliveryId)->first();

    if ($delivery) {
        $delivery->status = 'Cancelled';
        $delivery->save();

        return response()->json(['status' => 'success', 'message' => 'Delivery cancelled successfully']);
    } else {
        return response()->json(['status' => 'error', 'message' => 'Delivery not found']);
    }
}
}