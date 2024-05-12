<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Cartitem;

class ProductController extends Controller
{
    public function displayAll()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function cartDetails($email)
    {
        $cartItems = Cartitem::where('email', $email)->get();
        $productIds = $cartItems->pluck('product_id')->toArray();
        $products = Product::whereIn('id', $productIds)->get();
        return response()->json($products);
    }

    public function getProductById($product_id)
    {
        $product = Product::find($product_id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    public function updateStock(Request $request)
    {
        $product_id = $request->input('product_id');
        $product = Product::find($product_id);
        if (!$product) {
            return response()->json(['message' => 'Product not found.'], 404);
        }
        $currentStock = $product->stock;
        $quantity = $request->input('qty');
        if (!is_numeric($quantity) || $quantity < 0) {
            return response()->json(['message' => 'Invalid quantity.'], 400);
        }
        $updatedStock = $currentStock - $quantity;
        $product->stock = $updatedStock;
        $product->save();
        return response()->json(['product' => $product]);

    }
}