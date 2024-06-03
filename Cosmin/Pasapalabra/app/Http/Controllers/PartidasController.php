<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Partidas;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class PartidasController extends Controller
{
    /**
     * MUESTRA DE LAS PARTIDAS
     */
    public function index()
    {
        $partidas = Partidas::where('id_usuario', Auth::id())->get();
        return Inertia::render('ListPartidas', ['partidas' => $partidas]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $nuevaPartida =  Partidas::create(
            $request->validate([
                'nombre' => 'required|string|max:255',
                'id_usuario' => 'required'
            ])
        );

        if ($request->url_to != null) {
            return to_route($request->url_to, ['partida' => $nuevaPartida->id]);
        }
        return to_route('partida.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Partidas $partidas)
    {
        //
    }

    /**
     * AQUI ES DONDE SE VA A JUGAR
     */
    public function edit(Partidas $partidas)
    {
        //
    }

    /**
     * AQUI ES DONDE SE VA A MODIFICAR LA PARTIDA
     */
    public function update(Request $request, Partidas $partidas)
    {
        //
    }

    /**
     * ????????????
     */
    public function destroy(Partidas $partidas)
    {
        //
    }
    /**
     * JUEGO ALEATORIO DE MOMENTO USANDO UN JSON
     */
    public function aleatorio()
    {
        $contents = File::get(base_path('public/storage/json/generate.json'));
        $json = json_decode(json: $contents, associative: true);
        $categorias = Categoria::where('id_usuario', Auth::id())->get();
        return Inertia::render('Aleatorio', ['preguntas' => $json, 'categorias' => $categorias]);
    }
}
