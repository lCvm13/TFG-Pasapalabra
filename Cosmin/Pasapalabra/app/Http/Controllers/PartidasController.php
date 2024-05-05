<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Partidas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class PartidasController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Partidas $partidas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Partidas $partidas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Partidas $partidas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partidas $partidas)
    {
        //
    }
    public function aleatorio()
    {
        $contents = File::get(base_path('public/storage/json/generate.json'));
        $json = json_decode(json: $contents, associative: true);
        $categorias = Categoria::where('id_usuario', Auth::id())->get();
        return Inertia::render('Aleatorio', ['preguntas' => $json, 'categorias' => $categorias]);
    }
}
