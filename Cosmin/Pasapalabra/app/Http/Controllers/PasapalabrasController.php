<?php

namespace App\Http\Controllers;

use App\Models\Pasapalabras;
use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Models\Preguntas;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class PasapalabrasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $categorias = Categoria::where('id', Auth::id())->get(['nombre_categoria', 'id']);
        $preguntas = Preguntas::where('id_usuario', Auth::id())->get();
        return Inertia::render("Pregunta", ['categorias' => $categorias, 'preguntas' => $preguntas]);
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
        //

        return to_route('pregunta.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pasapalabras $pasapalabras)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pasapalabras $pasapalabras)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pasapalabras $pasapalabras)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pasapalabras $pasapalabras)
    {
        //
    }
}
