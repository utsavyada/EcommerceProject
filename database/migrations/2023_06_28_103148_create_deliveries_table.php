<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('product_id');
            $table->string('email');
            $table->integer('qty');
            $table->double('price');
            $table->double('total');
            $table->enum('status', ['ORDER_RECIEVED', 'ORDER_CONFIRMATION', 'PACKAGING','PROCESSING','OUT_OF_DELIVERY','DELIVERED','CANCELLED'])->default('ORDER_RECIEVED');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliveries');
    }
};
