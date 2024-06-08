<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class EnablePgTrgmExtension extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('CREATE EXTENSION IF NOT EXISTS pg_trgm;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP EXTENSION IF EXISTS pg_trgm;');
    }
}
