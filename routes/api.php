<?php

use App\Http\Controllers\RazorpayController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DeliveryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/register", [CustomerController::class, 'register']);
Route::get('/login/{email}', [CustomerController::class, 'getByEmail']);
Route::get('/login/{email}/{password}', [CustomerController::class, 'login']);
Route::get("/display", [ProductController::class, 'displayAll']);
Route::post("/addtocart", [CartController::class, 'addTocart']);
Route::delete("/removecart", [CartController::class, 'removeCart']);
Route::get('/cartdetails/{email}', [ProductController::class, 'cartDetails']);
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/total', [OrderController::class, 'calculateTotalByEmail']);
Route::delete('/deliverycancel', [OrderController::class, 'canceldelivery']);
Route::delete('/afterpurchase', [OrderController::class, 'afterpurchase']);
Route::post('/show', [DeliveryController::class, 'show']);
Route::get('/product/{product_id}', [ProductController::class, 'getProductById']);
Route::post('/deliverystore', [DeliveryController::class, 'deliverystore']);
// Route::get('/delivery/{delivery_id}', [DeliveryController::class, 'getStatusUpdates']);
Route::put('/stock', [ProductController::class, 'updateStock']);
// Route::post('/tracking', [DeliveryController::class, 'tracking']);

Route::post('/makeOrder', [RazorpayController::class, 'makeOrder']);
Route::post('/cancelOrder', [OrderController::class, 'cancelOrder']);