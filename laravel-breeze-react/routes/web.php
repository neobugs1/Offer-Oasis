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
    $ads = Ad::where('status', 'approved')->orderBy('date_posted', 'desc')->paginate(5)->onEachSide(1);
    $adsData = AdResource::collection($ads)->response()->getData(true);

    return Inertia::render('Welcome', [
        'ads' => $adsData,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/oglasi', function () {
    $ads = auth()->user()->ads()->orderBy('date_posted', 'desc')->paginate(5)->onEachSide(1);
    $adsData = AdResource::collection($ads)->response()->getData(true);
    return Inertia::render('Oglasi', [
        'ads' => $adsData,
    ]);
})->middleware(['auth', 'verified'])->name('oglasi');

Route::get('/reviews', function () {
    $ads = Ad::where('status', 'pending')->orderBy('date_posted')->paginate(10)->onEachSide(1);
    $adsData = AdResource::collection($ads)->response()->getData(true);
    return Inertia::render('Reviews', [
        'ads' => $adsData,
    ]);
})->middleware(['auth', 'verified', 'can:view-reviews'])->name('reviews');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/ad/form', [AdController::class, 'create'])->name('ad.create');
    Route::post('/ad/store', [AdController::class, 'store'])->name('ad.store');
    Route::put('/ad/update/{ad}', [AdController::class, 'update'])->name('ad.update');
    Route::put('/ad/renew/{ad}', [AdController::class, 'renew'])->name('ad.renew');
    Route::put('/ad/approve/{ad}', [AdController::class, 'approve'])->name('ad.approve');
    Route::put('/ad/reject/{ad}', [AdController::class, 'reject'])->name('ad.reject');


    Route::delete('/ad/destroy/{ad}', [AdController::class, 'destroy'])->name('ad.destroy');
    Route::get('/ad/edit/{ad}', [AdController::class, 'edit'])->name('ad.edit');
});


Route::get('/search', [AdController::class, 'index'])->name('search');
Route::get('/ad/{ad}', [AdController::class, 'show'])->name('ad.show');


require __DIR__ . '/auth.php';
