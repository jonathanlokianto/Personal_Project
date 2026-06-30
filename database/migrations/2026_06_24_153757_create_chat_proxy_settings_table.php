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
        Schema::create('chat_proxy_settings', function (Blueprint $table) {
            $table->id();
            $table->string('preset_name', 255);
            $table->string('model_name', 255);
            $table->string('model_proxy_url', 255);
            $table->text('model_api_key');
            $table->text('model_custom_prompt')->nullable();
            $table->boolean('preset_isActive')->default(false);
            $table->boolean('preset_isDefault')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_proxy_settings');
    }
};
