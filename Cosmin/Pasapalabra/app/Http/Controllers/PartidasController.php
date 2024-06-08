<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Partidas;
use App\Models\Pasapalabras;
use App\Models\Preguntas;
use App\Models\PreguntasPartidas;
use App\Models\PreguntasPasapalabras;
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
    public function index(Request $request)
    {
        $partidas = Partidas::where('id_usuario', Auth::id())->get();
        $preguntas_partida = PreguntasPartidas::where('id_usuario', Auth::id())->get();
        $preguntas = Preguntas::where('id_usuario', Auth::id())->get();
        $categorias = Categoria::all();
        if ($request->message) {
            return Inertia::render('ListPartidas', ['partidas' => $partidas])->with('flash', ['message', $request->message]);
        }
        return Inertia::render('ListPartidas', ['partidas' => $partidas, 'preguntas_partida' => $preguntas_partida, 'preguntas' => $preguntas, 'categorias' => $categorias]);
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
        $longitud = PreguntasPasapalabras::where('id_pasapalabra', $request->id_pasapalabra)->count();
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255|unique:partidas',
            'id_usuario' => 'required|integer',
            'id_pasapalabra' => 'required|integer',
        ]);

        $validatedData['num_sin_contestar'] = $longitud;
        // Crear la nueva partida
        $nuevaPartida = Partidas::create($validatedData);
        // return to_route('partida.edit', ['id_pasapalabra' => $request->id, 'partida' => $nuevaPartida]);
        return redirect()->route('partida.edit', ['partida' => $nuevaPartida, 'id_pasapalabra' => $request->id_pasapalabra]);
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
    public function edit(Request $request)
    {
        $preguntasPasapalabra =  PreguntasPasapalabras::where('id_pasapalabra', $request->id_pasapalabra)->get();
        $idPreguntas = [];
        foreach ($preguntasPasapalabra as $pregunta) {
            array_push($idPreguntas, $pregunta->id_pregunta);
        }
        $preguntas = Preguntas::whereIn('id', $idPreguntas)->get();
        $pasapalabra = Pasapalabras::where('id', $request->id_pasapalabra)->get();
        $partida = Partidas::where('id', $request->partida)->get();
        $preguntasProgreso = PreguntasPartidas::where('id_partida', $request->partida)->get();
        return Inertia::render("Juego", ['preguntas' => $preguntas, 'pasapalabra' => $pasapalabra, 'partida' => $partida[0], 'preguntas_partida' => $preguntasProgreso]);
    }

    /**
     * AQUI ES DONDE SE VA A MODIFICAR LA PARTIDA
     */
    public function update(Request $request, $id_partida)
    {
        $updateData = array_filter($request->only(['nombre', 'num_sin_contestar', 'num_aciertos', 'num_fallados']), function ($value) {
            return !is_null($value);
        });

        // Buscar la partida por ID
        $partida = Partidas::find($id_partida);

        if ($partida) {
            // Actualizar la partida con los datos filtrados
            $partida->update($updateData);
        }
        // return redirect()->back();
    }

    /**
     * ????????????
     */
    public function destroy($id_partida)
    {
        Partidas::find($id_partida)->delete();
        return redirect()->route('partida.index')->with('message', 'Partida borrada con éxito');
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
