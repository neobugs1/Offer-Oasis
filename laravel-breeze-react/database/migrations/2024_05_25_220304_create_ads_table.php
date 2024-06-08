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

            $table->string('brand')->nullable(); // Марка
            $table->string('model')->nullable(); // Модел
            $table->integer('year')->nullable(); // Година
            $table->string('fuel_type')->nullable(); // Гориво
            $table->integer('mileage')->nullable(); // Километри
            $table->string('transmission')->nullable(); // Менувач
            $table->string('body_type')->nullable(); // Каросерија
            $table->string('color')->nullable(); // Боја
            $table->string('registration_country')->nullable(); // Регистрација
            $table->date('registration_valid_until')->nullable(); // Регистрирана до
            $table->integer('engine_power_ks')->nullable(); // Сила на моторот (ks)
            $table->string('emission_class')->nullable(); // Kласа на емисија

            $table->timestamp('date_posted')->nullable();
            $table->integer('view_count')->default(0);
            $table->timestamps();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');

        });
        // Create a trigram index for more flexible full-text search
        DB::statement('
          CREATE INDEX ads_trgm_index ON ads USING GIN (
              (title || \' \' || description || \' \' || COALESCE(brand, \'\') || \' \' || COALESCE(model, \'\') || \' \' || COALESCE(fuel_type, \'\') || \' \' || COALESCE(transmission, \'\') || \' \' || COALESCE(body_type, \'\') || \' \' || COALESCE(color, \'\') || \' \' || COALESCE(registration_country, \'\') || \' \' || COALESCE(emission_class, \'\') || \' \' || status) gin_trgm_ops
          );
      ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ads');
    }
};