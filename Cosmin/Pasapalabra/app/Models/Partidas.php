<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Partidas extends Model
{
    use HasFactory;

    public function partidas_user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function partidas_preguntas(): HasMany
    {
        return $this->hasMany(Preguntas::class);
    }

      protected $fillable = [
        'num_aciertos', 'num_fallados', 'num_sin_contestar'
    ];
}

