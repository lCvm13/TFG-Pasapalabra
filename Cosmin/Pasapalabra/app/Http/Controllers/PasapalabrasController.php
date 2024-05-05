<?php

namespace App\Http\Controllers;

use App\Models\Pasapalabras;
use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Models\Preguntas;

use Illuminate\Auth\Access\Gate;
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
        //$categorias = Categoria::where('id', Auth::id())->get(['nombre_categoria', 'id']);
        //$preguntas = Preguntas::where('id_usuario', Auth::id())->get();
        //return Inertia::render("Pasapalabra", ['categorias' => $categorias, 'preguntas' => $preguntas]);
        $pasapalabras = Pasapalabras::where('id_usuario', Auth::id())->get();
        $categorias = Categoria::where('id', Auth::id())->get(['nombre_categoria', 'id']);
        return Inertia::render("ListPasapalabras", ['pasapalabras' => $pasapalabras, 'categorias' => $categorias]);
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
        Pasapalabras::create(
            $request->validate([
                'nombre' => 'required|string|max:255',
                'id_usuario' => 'required'
            ])
        );
        $nombre_pasap = $request->nombre;
        if ($request->url_to != null) {
            return to_route($request->url_to, ['pasapalabra' => $nombre_pasap]);
        }
        return to_route('pasapalabra.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pasapalabras $pasapalabras)
    {
        $pasapalabras = Pasapalabras::where('id_usuario', Auth::id())->get();
        return Inertia::render("ListPasapalabras", ['pasapalabras' => $pasapalabras]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pasapalabras $pasapalabras)
    {

        $categorias = Categoria::where('id', Auth::id())->get(['nombre_categoria', 'id']);
        $preguntas = Preguntas::where('id_usuario', Auth::id())->get();
        return Inertia::render("Pasapalabra", ['pasapalabra' => $pasapalabras, 'categorias' => $categorias, 'preguntas' => $preguntas]);
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

        $pasapalabras->delete();
        dd($pasapalabras);
    }
}
