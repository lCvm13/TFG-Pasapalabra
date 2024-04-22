<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasapalabras extends Model
{
    use HasFactory;
    public function pasapalabra_user()
    {
        return $this->belongsTo(User::class);
    }
}
