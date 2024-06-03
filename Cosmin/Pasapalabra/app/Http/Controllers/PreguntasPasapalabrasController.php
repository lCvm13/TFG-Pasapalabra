<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Pasapalabras;
use App\Models\Preguntas;

use App\Models\PreguntasPasapalabras;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
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
        $pasapalabra =  Pasapalabras::find($request->id_pasapalabra);
        if ($pasapalabra->id_categoria != null) {
            $preguntas = Preguntas::where('id_usuario', Auth::id())->where('id_categoria', $pasapalabra->id_categoria)->get();
            $categoria = Categoria::find($pasapalabra->id_categoria);
        } else {
            $preguntas = Preguntas::where('id_usuario', Auth::id())->get();
            $categoria = null;
        }
        $preguntas_colorear = PreguntasPasapalabras::where('id_pasapalabra', $request->id_pasapalabra)->get();
        if ($request->message) {
            return Inertia::render('PasapalabrasPreguntas', ['pasapalabra' => $pasapalabra, 'preguntas' => $preguntas, 'categoria' => $categoria, 'preguntasPasapalabra' => $preguntas_colorear])->with('flash', $request->message);
        }
        return Inertia::render('PasapalabrasPreguntas', ['pasapalabra' => $pasapalabra, 'preguntas' => $preguntas, 'categoria' => $categoria, 'preguntasPasapalabra' => $preguntas_colorear]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $preguntaCrear = PreguntasPasapalabras::create(
            $request->validate([
                'id_usuario' => 'required',
                'id_pasapalabra' => 'required',
                'id_pregunta' => [
                    'required',
                    Rule::unique('preguntas_pasapalabras')->where(function ($query) use ($request) {
                        return $query->where('id_pasapalabra', $request->id_pasapalabra);
                    }),
                ],
            ])
        );
        return to_route('preguntas_pasapalabras.create', ['id_pasapalabra' => $request->id_pasapalabra])->with('message', 'Pregunta insertada con éxito');
    }

    /**
     * Display the specified resource.
     */
    public function show(preguntaspasapalabras $preguntas_pasapalabras)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(preguntaspasapalabras $preguntas_pasapalabras)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, preguntaspasapalabras $preguntas_pasapalabras)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        PreguntasPasapalabras::where('id_pregunta', $request->preguntas_pasapalabra)->delete();
        return redirect()->route('preguntas_pasapalabras.create', ['id_pasapalabra' => $request->id_pasapalabra])->with('message', 'Pregunta eliminada del rosco correctamente.');
    }
}
