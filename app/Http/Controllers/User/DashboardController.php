<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $books = Book::with('category')
            ->where('stock', '>', 0)
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('User/Dashboard', [
            'categories' => $categories,
            'books' => $books,
        ]);
    }
}