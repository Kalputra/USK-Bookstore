<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // MySQL requires changing the enum values
        DB::statement("ALTER TABLE orders MODIFY payment_status ENUM('pending', 'unpaid', 'paid') DEFAULT 'pending'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE orders MODIFY payment_status ENUM('unpaid', 'paid') DEFAULT 'unpaid'");
    }
};
