<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;
    protected $table = "deliveries";
    protected $primaryKey = "id";

    protected $fillable = [
        'user_id',
        'product_id',
        'qty',
        'price',
        'email',
        'total',
    ];
}