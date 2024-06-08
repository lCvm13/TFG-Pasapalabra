<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreguntasPartidas extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre', 'id_usuario', "id_partida", 'id_pregunta', 'respuesta_usuario',
    ];
}
