<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // Tampilin list kategori beserta jumlah buku di masing-masing kategori
    public function index()
    {
        $categories = Category::withCount('books')->latest()->get();
        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    // Buka form halaman buat nambah kategori baru
    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    // Simpen kategori baru ke DB, generate slug otomatis dari nama
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
        ]);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category created successfully.');
    }

    // Load data kategori yang mau diedit buat form
    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    // Update nama + slug + deskripsi kategori
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
        ]);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category updated successfully.');
    }

    // Hapus kategori tapi cek dulu kalo masih ada buku jangan sampe kehapus
    public function destroy(Category $category)
    {
        if ($category->books_count > 0 || $category->books()->count() > 0) {
            return back()->with('error', 'Tidak bisa hapus kategori karena masih ada buku yang terkait (' . $category->books_count . ' buku). Pindahkan atau hapus buku terlebih dahulu.');
        }

        $category->delete();
        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berhasil dihapus.');
    }
}
