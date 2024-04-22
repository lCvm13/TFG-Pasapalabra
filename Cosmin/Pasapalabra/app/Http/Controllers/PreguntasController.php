<?php

namespace App\Http\Controllers;

use App\Models\Preguntas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreguntasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Pregunta");
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

        dd($request);
        /*
        $validated = $request->validate([
            'pregunta' => 'required|string|max:255',
            'respuesta' => 'required|string|max:255',
            'letra' => 'required|string|max:1',
            'posicion' => 'required'

            ]);

        $request->user()->pregunta()->create($validated);
            return redirect(route('pregunta.index')); 
        */
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
