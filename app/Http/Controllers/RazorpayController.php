<?php

namespace App\Http\Controllers;
use Razorpay\Api\Api;
use Illuminate\Http\Request;

class RazorpayController extends Controller
{
    public $api;
    public function __construct(){
        $this->api = new Api("rzp_test_R2HtqhCwcqmGEQ","C7H2b0v6mo0Rrnv4jcf8OBH7");
    }
    public function makeOrder(Request $req){
        $amount = $req->input('amount');
        $orderid=rand(111111,999999);
        $orderData = [
            'receipt'         => 'rcptid_11',
            'amount'          => $amount*100, 
            'currency'        => 'INR'
        ];
        
        $razorpayOrder = $this->api->order->create($orderData);
        // dd($razorpayOrder);
        return response()->json([
            'status' => 'success',
            'orderId' => $orderid, 
        ]);
        
    }
}
