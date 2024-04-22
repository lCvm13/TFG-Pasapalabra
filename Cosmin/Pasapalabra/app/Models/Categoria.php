<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    public function categorias_user()
    {
        return $this->belongsTo(User::class);
    }
    
    protected $fillable = [
        'nombre_categoria' ,'id_usuario'
    ];
}
