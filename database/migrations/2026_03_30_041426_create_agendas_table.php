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
        Schema::create('agendas', function (Blueprint $table) {
            $table->id();
            $table->string('content', 255);
            $table->string('note', 1000)->nullable(true);
            $table->timestamps();
            $table->integer('progress', false, false)->default(0);
            $table->timestamp('completed_at')->nullable();
            $table->boolean('isSuspended')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agendas');
    }
};
