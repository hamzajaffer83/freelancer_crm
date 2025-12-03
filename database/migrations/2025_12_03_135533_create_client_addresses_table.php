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
        Schema::create('client_addresses', function (Blueprint $table) {
            $table->id();

            // Relationship to client
            $table->foreignId('client_id')
                ->constrained('clients')
                ->cascadeOnDelete();

            // OPTIONAL: If companies also have addresses
            $table->foreignId('company_id')
                ->nullable()
                ->constrained('client_companies')
                ->nullOnDelete();

            // Address type (billing, shipping, work, home, etc.)
            $table->enum('type', ['billing', 'shipping', 'office', 'home', 'other'])
                ->default('billing');

            // Actual address fields
            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('street')->nullable();
            $table->string('building')->nullable();
            $table->string('apartment')->nullable();

            // Optional full address in text format
            $table->text('notes')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_addresses');
    }
};
