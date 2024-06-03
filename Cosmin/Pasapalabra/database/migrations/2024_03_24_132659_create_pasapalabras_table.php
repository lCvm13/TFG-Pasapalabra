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
        Schema::create('pasapalabras', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("nombre")->unique();
            $table->boolean("infinito")->default(false);
            $table->boolean('habilitado')->default(true);
            $table->foreignId("id_categoria")->nullable();
            $table->foreign('id_categoria')->references('id')->on('categorias')->onDelete('cascade');
            $table->foreignId("id_usuario");
            $table->foreign('id_usuario')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasapalabras');
    }
};
