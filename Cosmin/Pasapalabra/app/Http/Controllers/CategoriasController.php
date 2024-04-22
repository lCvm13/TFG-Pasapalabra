<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorias= Categoria::all();
        return Inertia::render("Categoria", ['categorias' => $categorias]);
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
    public function store(Request $request) :RedirectResponse
    {
    
        Categoria::create(
        $request->validate([
            'nombre_categoria' => 'required|string|max:255',
            'id_usuario' => 'required'
            ])
        );
    
        return to_route('categoria.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categorias)
    {
        //
    }

   
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categorias)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categorias)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categorias)
    {
        //
    }
}
