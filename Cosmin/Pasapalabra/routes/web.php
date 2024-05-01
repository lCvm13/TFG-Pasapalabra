<?php

use App\Http\Controllers\CategoriasController;
use App\Http\Controllers\PasapalabrasController;
use App\Http\Controllers\PreguntasController;
use App\Http\Controllers\ProfileController;
use App\Models\Categoria;
use App\Models\Pasapalabras;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'categorias' => Categoria::where('id', Auth::id())->get()
    ]);
})->name('index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::resource('pregunta', PreguntasController::class)
    ->only(['index', 'store', 'edit', 'update', 'destroy'])
    ->middleware(['auth']);

Route::resource('pasapalabra', PasapalabrasController::class)
    ->only(['index', 'show', 'store', 'edit', 'update', 'destroy', 'delete'])
    ->middleware(['auth']);

Route::delete('/pasapalabra/{pasapalabra}', [Pasapalabras::class, 'destroy'])->name('pasapalabra.destroy');

Route::resource('categoria', CategoriasController::class)->only(['index', 'show', 'store', 'edit', 'update', 'destroy', 'categoriaForm'])
    ->middleware(['auth']);

Route::get('categoriaForm', [CategoriasController::class, 'categoriaForm'])->name('categoria.categoriaForm');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
