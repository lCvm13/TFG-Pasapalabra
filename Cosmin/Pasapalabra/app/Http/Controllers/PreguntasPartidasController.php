<?php

namespace App\Http\Controllers;

use App\Models\PreguntasPartidas;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PreguntasPartidasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->respuesta_usuario == null) {
            $request->merge(['respuesta_usuario' => ""]);
        }
        $preguntas = PreguntasPartidas::create($request->validate([
            'respuesta_usuario' => 'string|max:255',
            'id_usuario' => 'required',
            'id_pregunta' => [
                'required',
                Rule::unique('preguntas_partidas')->where(function ($query) use ($request) {
                    return $query->where('id_partida', $request->id_partida);
                }),
            ],
            'id_partida' => 'required'
        ]));
    }


    /**
     * Display the specified resource.
     */
    public function show(PreguntasPartidas $preguntas_partidas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PreguntasPartidas $preguntas_partidas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $preguntas_partidas)
    {
        PreguntasPartidas::where('id_partida', $preguntas_partidas)->where('id_pregunta', $request->id_pregunta)->update([
            'respuesta_usuario' => $request->respuesta_usuario
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PreguntasPartidas $preguntas_partidas)
    {
        //
    }
}
