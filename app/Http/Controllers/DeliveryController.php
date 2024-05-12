<?php

// namespace App\Http\Controllers;

// use App\Models\Product;
// use App\Models\Delivery;
// use App\Models\Order;
// use App\Models\Track;


// use Illuminate\Http\Request;

// class DeliveryController extends Controller
// {
//     public function show(Request $request)
//     {
//         $email = $request->input('email');

//         $orders = Delivery::where('email', $email)->get();
//         $productIds = $orders->pluck('product_id')->unique()->toArray();
//         $products = collect();
//         foreach ($productIds as $productId) {
//             $productOrders = $orders->where('product_id', $productId);
//             foreach ($productOrders as $productOrder) {
//                 $product = Product::find($productId);
//                 $newProduct = clone $product;
//                 $newProduct->qty = $productOrder->qty;
//                 $newProduct->total = $productOrder->total;
//                 $newProduct->id = $productOrder->id;
//                 ///
//                 $newProduct->status = $productOrder->status;
//                 ///
//                 $newProduct->purchase = $productOrder->created_at;
//                 $products->push($newProduct);
//             }
//         }
//         return response()->json($products);
//     }

//     public function deliverystore(Request $req)
//     {
//         $email = $req->input('email');
//         $orders = Order::where('email', $email)->get();
//         $deliveryData = [];
//         foreach ($orders as $order) {
//             $delivery = Delivery::create([
//                 'user_id' => $order->user_id,
//                 'product_id' => $order->product_id,
//                 'qty' => $order->qty,
//                 'price' => $order->price,
//                 'email' => $order->email,
//                 'total' => $order->price * $order->qty
//             ]);

//             $deliveryData[] = [
//                 'id' => $delivery->id,
//                 'qty' => $delivery->qty,
//                 'product_id' => $delivery->product_id
//             ];
//         }
//         return response()->json(['message' => 'Purchased', 'data' => $deliveryData]);
//     }

//     public function getStatusUpdates($deliveryId)
//     {
//         $statusUpdates = Track::where('delivery_id', $deliveryId)
//             ->orderBy('updated_at')
//             ->get(['status', 'updated_at']);

//         return response()->json($statusUpdates);
//     }

//     public function tracking(Request $req)
//     {
//         $track = new Track;
//         $track->delivery_id = $req->input('delivery_id');
//         $track->save();
//         return $track;
//     }
// } -->

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Delivery;
use App\Models\Order;

use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    public function show(Request $request)
    {
        $email = $request->input('email');
        $orders = Delivery::where('email', $email)->get();
        $deliveryIds = $orders->pluck('id')->unique()->toArray();
        $products = collect();
        foreach ($deliveryIds as $deliveryId) {
            $deliveryOrders = $orders->where('id', $deliveryId);
            foreach ($deliveryOrders as $deliveryOrder) {
                $product = Product::find($deliveryOrder->product_id);
                if ($product) {
                    $newProduct = clone $product;
                    $newProduct->qty = $deliveryOrder->qty;
                    $newProduct->total = $deliveryOrder->total;
                    $newProduct->delivery_id = $deliveryOrder->id;
                    $newProduct->status = $deliveryOrder->status;
                    $newProduct->purchase = $deliveryOrder->created_at;
                    $products->push($newProduct);
                }
            }
        }

        return response()->json($products);

    }

    public function deliverystore(Request $req)
    {
        $email = $req->input('email');
        $orders = Order::where('email', $email)->get();
        $deliveryData = [];
        foreach ($orders as $order) {
            $delivery = Delivery::create([
                'user_id' => $order->user_id,
                'product_id' => $order->product_id,
                'qty' => $order->qty,
                'price' => $order->price,
                'email' => $order->email,
                'total' => $order->price * $order->qty
            ]);

            $deliveryData[] = [
                'id' => $delivery->id,
                'qty' => $delivery->qty,
                'product_id' => $delivery->product_id

            ];
        }
        return response()->json(['message' => 'Purchased', 'data' => $deliveryData]);
    }

    // public function getStatusUpdates($deliveryId)
    // {
    //     $statusUpdates = Track::where('delivery_id', $deliveryId)
    //         ->orderBy('updated_at')
    //         ->get(['status', 'updated_at']);

    //     return response()->json($statusUpdates);
    // }

    // public function tracking(Request $req)
    // {
    //     $track = new Track;
    //     $track->delivery_id = $req->input('delivery_id');
    //     $track->save();
    //     return $track;
    // }   not for use
}