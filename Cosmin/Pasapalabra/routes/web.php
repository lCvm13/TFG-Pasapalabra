<?php

use App\Http\Controllers\CategoriasController;
use App\Http\Controllers\PartidasController;
use App\Http\Controllers\PasapalabrasController;
use App\Http\Controllers\PreguntasController;
use App\Http\Controllers\PreguntasPartidasController;
use App\Http\Controllers\PreguntasPasapalabrasController;
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
    ->only(['index', 'store', 'create', 'edit', 'update', 'destroy'])
    ->middleware(['auth']);

Route::resource('partida', PartidasController::class)
    ->only(['index', 'store', 'create', 'edit', 'update', 'destroy', 'aleatorio'])
    ->middleware(['auth']);

Route::resource('pasapalabra', PasapalabrasController::class)
    ->only(['index', 'show', 'create', 'store', 'edit', 'update', 'destroy'])
    ->middleware(['auth']);

Route::resource('preguntas_pasapalabras', PreguntasPasapalabrasController::class)
    ->only(['index', 'show', 'create', 'store', 'edit', 'update', 'destroy'])
    ->middleware(['auth']);


Route::resource('categoria', CategoriasController::class)
    ->only(['index', 'create', 'show', 'store', 'edit', 'update', 'destroy'])
    ->middleware(['auth']);

Route::resource('partida', PartidasController::class)
    ->only(['index', 'create', 'show', 'store', 'edit', 'update', 'destroy'])
    ->middleware(['auth']);

// Route::get('form', [CategoriasController::class, 'form'])->name('categoria.form');

Route::get('aleatorio', [PartidasController::class, 'aleatorio'])->name('partida.aleatorio');
// Route::get('preguntas_pasapalabras/create/{id_pasapalabra}', [PreguntasPartidasController::class, 'create'])->name('preguntas_pasapalabras.create');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
