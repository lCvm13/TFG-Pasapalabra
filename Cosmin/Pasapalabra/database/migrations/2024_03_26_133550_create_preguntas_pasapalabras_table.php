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
        Schema::create('preguntas_pasapalabras', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId("id_usuario");
            $table->foreignId("id_pasapalabra");
            $table->foreignId("id_pregunta");
            $table->foreign('id_usuario')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_pasapalabra')->references('id')->on('pasapalabras')->onDelete('cascade');
            $table->foreign('id_pregunta')->references('id')->on('preguntas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preguntas_pasapalabras');
    }
};
