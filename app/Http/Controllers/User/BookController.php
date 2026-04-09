<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::with('category');

        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('author', 'like', '%' . $request->search . '%');
        }

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        $books = $query->where('stock', '>', 0)->latest()->get();
        $categories = Category::all();

        return Inertia::render('User/Books/Index', [
            'books' => $books,
            'categories' => $categories,
        ]);
    }

    public function show(Book $book)
    {
        $book->load('category');
        return Inertia::render('User/Books/Show', [
            'book' => $book,
        ]);
    }
}