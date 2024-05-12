<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function register(Request $req)
    {
        $customer = Customer::where('email', $req->email)->first();

        if (!$customer) {
            $user = Customer::create([
                'name' => $req->name,
                'email' => $req->email,
                'password' => Hash::make($req->password),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
                'customer' => $customer,
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Email already exists'
            ]);
        }
    }

    public function getByEmail($email)
    {
        if ($email) {
            try {
                $customer = Customer::where('email', $email)->get();

                if ($customer->count() > 0) {
                    return response()->json([
                        'status' => 'success',
                        'customer' => $customer,
                    ]);
                }

                return response()->json([
                    'status' => 'error',
                    'message' => 'No customer found for the given email.',
                ], 404);
            } catch (\Exception $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Error fetching data: ' . $e->getMessage(),
                ], 500);
            }
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Email parameter is missing.',
        ], 400);
    }


    public function login(Request $req, $email, $password)
    {
        if ($email && $password) {
            $customer = Customer::where('email', $email)->first();
            if ($customer) {
                if (Hash::check($password, $customer->password)) {
                    return response()->json([
                        'status' => 'success',
                        'customer' => $customer,
                    ]);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Invalid email or password.',
                    ], 401);
                }
            }
        }
    }

}