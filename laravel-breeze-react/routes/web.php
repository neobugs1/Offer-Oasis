<?php

use App\Http\Controllers\AdController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Resources\AdResource;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Ad;



Route::get('/', function () {
    $ads = Ad::paginate(5)->onEachSide(1);
    $adsData = AdResource::collection($ads)->response()->getData(true);

    return Inertia::render('Welcome', [
        'ads' => $adsData,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/ad/form', [AdController::class, 'create'])->name('ad.create');
    Route::post('/ad/store', [AdController::class, 'store'])->name('ad.store');
    Route::put('/ad/update/{ad}', [AdController::class, 'update'])->name('ad.update'); // Change to PUT

    Route::delete('/ad/destroy/{ad}', [AdController::class, 'destroy'])->name('ad.destroy');
    Route::get('/ad/edit/{ad}', [AdController::class, 'edit'])->name('ad.edit');
});


Route::get('/search', [AdController::class, 'index'])->name('search');
Route::get('/ad/{ad}', [AdController::class, 'show'])->name('ad.show');


require __DIR__ . '/auth.php';
