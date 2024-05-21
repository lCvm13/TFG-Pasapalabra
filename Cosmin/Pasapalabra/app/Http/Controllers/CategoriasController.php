<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class CategoriasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $categorias = Categoria::where('id_usuario', Auth::id())->get();
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
        // } catch (Exception $e) {
        //     return redirect()->route('categoria.form', ["message" => "Duplicate entry with name " . $request->nombre_categoria]);
        // }

        $message = 'Categoria creada con éxito';
        if ($request->url_to != null) {
            return
                redirect()->route($request->url_to, ["message" => $message]);
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
        //

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
        // dd($id_categoria);
        // $categoria->delete();
        return redirect()->route('categoria.index');
    }

    public function form()
    {
        return Inertia::render("Categoria");
    }
}
