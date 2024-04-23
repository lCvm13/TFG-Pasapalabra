<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Preguntas;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class PreguntasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()

    {
        // Get all Categorias with id == auth user id.
        $categorias = Categoria::where('id', Auth::id())->get(['nombre_categoria', 'id']);
        return Inertia::render("Pregunta", ['categorias' => $categorias]);
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
    public function store(Request $request): RedirectResponse
    {
        Preguntas::create(
            $request->validate([
                'pregunta' => 'required|string|max:255',
                'respuesta' => 'required|string|max:255',
                'letra' => 'required|string|max:1',
                'posicion_letra' => 'required',
                'id_usuario' => 'required',
                'id_categoria' => 'required'
            ])
        );
        return to_route('pregunta.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Preguntas $preguntas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Preguntas $preguntas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Preguntas $preguntas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Preguntas $preguntas)
    {
        //
    }
}
