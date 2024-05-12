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
        $preguntas = Preguntas::where('id_usuario', Auth::id())->get();
        $categorias = Categoria::where('id_usuario', Auth::id())->get(['nombre_categoria', 'id']);
        return Inertia::render("ListPreguntas", ['preguntas' => $preguntas, 'categorias' => $categorias]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categorias = Categoria::where('id_usuario', Auth::id())->get(['nombre_categoria', 'id']);
        return Inertia::render("Pregunta", ['categorias' => $categorias]);
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
        Preguntas::find($id_pregunta)->update([
            'pregunta' => $request->pregunta,
            'respuesta' => $request->respuesta,
            'letra' => $request->letra,
            'posicion_letra' => $request->posicion_letra,
            'id_categoria' => $request->id_categoria,
        ]);
        return redirect()->route('pregunta.index')->with('message', 'Pregunta modificada correctamente');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id_pregunta)
    {
        Preguntas::find($id_pregunta)->delete();
        // dd($id_categoria);
        // $categoria->delete();
        return redirect()->route('pregunta.index');
    }
}
