<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Pasapalabras;
use App\Models\Preguntas;
use App\Models\PreguntasPasapalabras;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class PreguntasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)

    {
        // Get all Categorias with id == auth user id.
        $preguntas = Preguntas::where('id_usuario', Auth::id())->get();
        $categorias = Categoria::where('id_usuario', Auth::id())->get(['nombre_categoria', 'id']);
        $preguntas_pasapalabra = PreguntasPasapalabras::where('id_usuario', Auth::id())->get();
        $pasapalabra = Pasapalabras::where('id_usuario', Auth::id())->get();
        if ($request->message) {
            return Inertia::render("ListPreguntas", ['preguntas' => $preguntas, 'categorias' => $categorias, 'preguntas_pasapalabra' => $preguntas_pasapalabra, 'pasapalabra' => $pasapalabra])->with('flash', $request->message);
        }
        return Inertia::render("ListPreguntas", ['preguntas' => $preguntas, 'categorias' => $categorias, 'preguntas_pasapalabra' => $preguntas_pasapalabra, 'pasapalabra' => $pasapalabra]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $categorias = Categoria::where('id_usuario', Auth::id())->get(['nombre_categoria', 'id']);
        if ($request->message) {
            return Inertia::render("Pregunta", ['categorias' => $categorias])->with('flash', $request->message);
        }
        return Inertia::render("Pregunta", ['categorias' => $categorias]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            Preguntas::create(
                $request->validate([
                    'pregunta' => 'required|string|max:255',
                    'respuesta' => 'required|string|max:255',
                    'letra' => 'required|string|max:1',
                    'posicion_letra' => 'required',
                    'id_usuario' => 'required',
                    'id_categoria' => ''
                ])
            );
            return to_route('pregunta.index');
        } catch (\Exception $e) {
            return to_route('pregunta.index')->with('message', 'La pregunta no se ha podido crear');
        }
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
    public function edit($id_pregunta)
    {
        $pregunta = Preguntas::find($id_pregunta);
        $categorias = Categoria::where('id_usuario', Auth::id())->get(['nombre_categoria', 'id']);
        return Inertia::render("Pregunta", ['pregunta' => $pregunta, 'categorias' => $categorias]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id_pregunta)
    {
        try {
            Preguntas::find($id_pregunta)->update([
                'pregunta' => $request->pregunta,
                'respuesta' => $request->respuesta,
                'letra' => $request->letra,
                'posicion_letra' => $request->posicion_letra,
                'id_categoria' => $request->id_categoria,
            ]);
            return redirect()->route('pregunta.index')->with('message', 'Pregunta modificada correctamente');
        } catch (Exception $e) {
            return redirect()->route('pregunta.index')->with('message', 'Pregunta no se ha podido modificar');
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id_pregunta)
    {
        Preguntas::find($id_pregunta)->delete();
        return redirect()->route('pregunta.index')->with(["message" => "Pregunta borrada con éxito"]);
    }
}
