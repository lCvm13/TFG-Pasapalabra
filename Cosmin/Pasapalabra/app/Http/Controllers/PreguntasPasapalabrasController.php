<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Pasapalabras;
use App\Models\Preguntas;
use App\Models\preguntas_pasapalabras;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PreguntasPasapalabrasController extends Controller
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
    public function create(Request $request)
    {
        //

        $pasapalabra =  Pasapalabras::find($request->id_pasapalabra);
        $preguntas = Preguntas::where('id_usuario', Auth::id())->where('id_categoria', $pasapalabra->id_categoria)->get();
        $categoria = Categoria::find($pasapalabra->id_categoria);
        return Inertia::render('PasapalabrasPreguntas', ['pasapalabra' => $pasapalabra, 'preguntas' => $preguntas, 'categoria' => $categoria]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $url_to)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(preguntas_pasapalabras $preguntas_pasapalabras)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(preguntas_pasapalabras $preguntas_pasapalabras)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, preguntas_pasapalabras $preguntas_pasapalabras)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(preguntas_pasapalabras $preguntas_pasapalabras)
    {
        //
    }
}
