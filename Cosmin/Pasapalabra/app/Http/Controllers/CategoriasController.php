<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Hamcrest\Arrays\IsArray;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $categorias = Categoria::where('id_usuario', Auth::id())->get();
        if ($request->message) {
            return Inertia::render("ListCategorias", ['categorias' => $categorias])->with('flash', ['message', $request->message]);
        }
        return Inertia::render("ListCategorias", ['categorias' => $categorias]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render("Categoria");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // try {

        Categoria::create(
            $request->validate([
                'nombre_categoria' => 'unique:categorias|required|string|max:255',
                'id_usuario' => 'required'
            ])
        );
        $message = 'Categoria creada con éxito';
        if ($request->url_to != null) {
            return !is_array($request->url_to) ?
                redirect()->route($request->url_to)->with("message", $message) :
                redirect()->route($request->url_to[0], $request->url_to[1])->with('message', $message);
        }
        return redirect()->route('categoria.index', ["message" => $message]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categorias)
    {
        $categorias = Categoria::where('id', Auth::id())->get();
        return Inertia::render("Categoria", ['categorias' => $categorias]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id_categoria)
    {
        //
        $categoria = Categoria::find($id_categoria);
        return Inertia::render("Categoria", ['categoria' => $categoria]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id_categoria)
    {
        $categoria = Categoria::find($id_categoria)->update([
            'nombre_categoria' => $request->nombre_categoria,
        ]);
        return redirect()->route('categoria.index')->with('message', 'Categoría modificada correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id_categoria)
    {
        Categoria::find($id_categoria)->delete();
        return redirect()->route('categoria.index')->with('message', 'Categoria borrada con éxito');
    }
}
