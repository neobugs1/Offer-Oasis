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
            $table->string('category');
            $table->foreignId('seller')->constrained('users');
            $table->unsignedBigInteger('reviewer')->nullable()->default(null);
            $table->decimal('price', 8, 2);
            $table->string('currency', 3);
            $table->decimal('start_price', 8, 2)->nullable();
            $table->json('images')->nullable();
            $table->string('condition');
            $table->string('brand')->nullable();
            $table->string('model')->nullable();
            $table->json('features')->nullable();
            $table->timestamp('date_posted')->nullable();
            $table->integer('view_count')->default(0);
            $table->integer('favorite_count')->default(0);
            $table->timestamps();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');

            // Foreign key constraints
            // $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');
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
