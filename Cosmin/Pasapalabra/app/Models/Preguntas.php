<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preguntas extends Model
{
    use HasFactory;

    public function preguntas_partidas()
    {
        return $this->belongsToMany(Partidas::class);
    }

    public function preguntas_categorias()
    {
        return $this->hasOne(Categoria::class);
    }
    
    protected $fillable = [
        'pregunta', 'respuesta', 'id_categoria'
    ];
}
