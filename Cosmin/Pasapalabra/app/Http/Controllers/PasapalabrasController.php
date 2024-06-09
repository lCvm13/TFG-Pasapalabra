<?php

namespace App\Http\Controllers;

use App\Models\Pasapalabras;
use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Models\Preguntas;
use App\Models\PreguntasPasapalabras;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class PasapalabrasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pasapalabras = Pasapalabras::where('id_usuario', Auth::id())->get();
        $categorias = Categoria::where('id_usuario', Auth::id())->get(['nombre_categoria', 'id']);
        $preguntas_pasapalabra = PreguntasPasapalabras::where('id_usuario', Auth::id())->get();
        if ($request->message) {
            return Inertia::render("ListPasapalabras", ['pasapalabras' => $pasapalabras, 'categorias' => $categorias])->with('flash', ['message', $request->message]);
        }
        return Inertia::render("ListPasapalabras", ['pasapalabras' => $pasapalabras, 'categorias' => $categorias, 'preguntas_pasapalabra' => $preguntas_pasapalabra]);
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
        $nuevo_pasapalabra =  Pasapalabras::create(
            $request->validate([
                'nombre' => 'required|string|max:255',
                'id_usuario' => 'required'
            ])
        );

        if ($request->url_to != null) {
            return to_route($request->url_to, ['pasapalabra' => $nuevo_pasapalabra->id]);
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
    public function edit($id_pasapalabra)
    {
        $pasapalabra = Pasapalabras::find($id_pasapalabra);
        $categorias = Categoria::where('id_usuario', Auth::id())->get(['nombre_categoria', 'id']);
        $preguntas = Preguntas::where('id_usuario', Auth::id())->get();
        return Inertia::render("Pasapalabra", ['pasapalabra' => $pasapalabra, 'categorias' => $categorias, 'preguntas' => $preguntas]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id_pasapalabra)
    {

        $checkPreguntas = PreguntasPasapalabras::where('id_pasapalabra', $id_pasapalabra)->count();
        if ($checkPreguntas > 0) {
            return redirect()->route('pasapalabra.index')->with('message', 'No se puede modificar el rosco porque tiene preguntas asociadas');
        }
        Pasapalabras::find($id_pasapalabra)->update([
            'nombre' => $request->nombre,
            'id_categoria' => $request->id_categoria,
            'infinito' => $request->infinito,
        ]);

        return redirect()->route('pasapalabra.index')->with('message', 'Rosco modificado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id_pasapalabra)
    {

        Pasapalabras::find($id_pasapalabra)->delete();
        return redirect()->route('pasapalabra.index')->with('message', 'Rosco borrado con éxito');
    }
}
