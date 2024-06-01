<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ads', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->foreignId('category')->constrained('categories');
            $table->foreignId('seller')->constrained('users');
            $table->unsignedBigInteger('reviewer')->nullable()->default(null);
            $table->integer('price');
            $table->enum('currency', ['EUR', 'MKD'])->default('MKD');
            $table->integer('start_price')->nullable();
            $table->string('condition');
            $table->string('brand')->nullable();
            $table->string('model')->nullable();
            $table->json('features')->nullable();
            $table->timestamp('date_posted')->nullable();
            $table->integer('view_count')->default(0);
            $table->integer('favorite_count')->default(0);
            $table->timestamps();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ads');
    }
};
