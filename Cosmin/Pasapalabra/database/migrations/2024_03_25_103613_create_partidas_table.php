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
        Schema::create('partidas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->boolean('contador')->default(false);
            $table->boolean('habilitado')->default(true);
            $table->integer("num_aciertos")->default(0);
            $table->integer("num_fallados")->default(0);
            $table->integer("num_sin_contestar")->default(27);
            $table->foreignId("id_usuario");
            $table->foreign('id_usuario')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partidas');
    }
};
