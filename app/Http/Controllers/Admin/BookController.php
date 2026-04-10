<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookController extends Controller
{
    // Tampilin daftar semua buku ke halaman admin pake Inertia
    public function index()
    {
        $books = Book::with('category')->latest()->get();
        return Inertia::render('Admin/Books/Index', [
            'books' => $books,
        ]);
    }

    // Buka form buat tambah buku baru, load semua kategori
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Books/Create', [
            'categories' => $categories,
        ]);
    }

    // Simpen buku baru ke DB, validate form + upload cover image + generate slug
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'isbn' => 'nullable|string',
            'pages' => 'nullable|integer',
            'publication_year' => 'nullable|integer',
            'cover_image' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['is_premium']);
        $data['slug'] = Str::slug($request->title);

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('books', 'public');
        }

        Book::create($data);

        return redirect()->route('admin.books.index')
            ->with('success', 'Book created successfully.');
    }

    // Load data buku yang mau diedit + semua kategori buat form
    public function edit(Book $book)
    {
        $categories = Category::all();
        return Inertia::render('Admin/Books/Edit', [
            'book' => $book,
            'categories' => $categories,
        ]);
    }

    // Update data buku, validate + ganti cover kalo ada file baru + update slug
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'isbn' => 'nullable|string',
            'pages' => 'nullable|integer',
            'publication_year' => 'nullable|integer',
            'cover_image' => 'nullable|image|max:2048',
        ]);

        $data = $request->except(['is_premium']);
        $data['slug'] = Str::slug($request->title);

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('books', 'public');
        }

        $book->update($data);

        return redirect()->route('admin.books.index')
            ->with('success', 'Book updated successfully.');
    }

    // Hapus buku dari database, langsung redirect ke list
    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->route('admin.books.index')
            ->with('success', 'Book deleted successfully.');
    }
}
