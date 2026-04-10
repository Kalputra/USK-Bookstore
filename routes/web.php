<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BookController as AdminBookController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\BookController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\User\ContactController;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing page homepage - redirect admin/user dashboard kalo udah login, tampil featured books + categories
Route::get('/', function () {
    if (Auth::check()) {
        $user = Auth::user();
        if ($user->isAdmin()) {
            return redirect('/admin/dashboard');
        }
        return redirect('/dashboard');
    }
    
    $books = Book::with('category')->where('stock', '>=', 0)->latest()->take(10)->get();
    $categories = Category::all();
    
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'books' => $books,
        'categories' => $categories,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Routes khusus admin - middleware auth + admin
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // CRUD categories admin
    Route::resource('categories', CategoryController::class);
    
    // CRUD books admin
    Route::resource('books', AdminBookController::class);
    
    // List + detail + update status orders admin
    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.updateStatus');
});

// Routes user (auth required) - dashboard, books, cart, orders, contact, about
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
    
    // List + detail books user
    Route::get('/books', [BookController::class, 'index'])->name('books.index');
    Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');
    
    // Cart operations: view, add, update qty, remove
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add/{book}', [CartController::class, 'add'])->name('cart.add');
    Route::put('/cart/update/{book}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/remove/{book}', [CartController::class, 'remove'])->name('cart.remove');
    
    // Orders: list, checkout/store, detail, konfirmasi bayar
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::post('/orders/{order}/confirm-payment', [OrderController::class, 'confirmPayment'])->name('orders.confirmPayment');
    
    // Contact form
    Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
    Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
    
    // About page
    Route::get('/about', function () {
        return Inertia::render('User/About');
    })->name('about');
});

require __DIR__.'/auth.php';