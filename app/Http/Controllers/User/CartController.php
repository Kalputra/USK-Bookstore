<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    // Tampilin isi keranjang dari session + calculate total
    public function index()
    {
        $cart = session()->get('cart', []);
        $cartItems = [];
        $total = 0;

        foreach ($cart as $id => $details) {
            $book = Book::find($id);
            if ($book) {
                $cartItems[] = [
                    'book' => $book,
                    'quantity' => $details['quantity'],
                    'subtotal' => $book->price * $details['quantity'],
                ];
                $total += $book->price * $details['quantity'];
            }
        }

        return Inertia::render('User/Cart/Index', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    // Tambah buku ke cart session, cek stok dulu
    public function add(Book $book)
    {
        if ($book->stock <= 0) {
            return back()->with('error', 'Buku ini stoknya habis bro!');
        }

        $cart = session()->get('cart', []);

        $newQuantity = 1;
        if (isset($cart[$book->id])) {
            $newQuantity = $cart[$book->id]['quantity'] + 1;
        }

        if ($newQuantity > $book->stock) {
            return back()->with('error', 'Stok tinggal ' . $book->stock . ', ga bisa tambah lagi nih!');
        }

        $cart[$book->id] = [
            'quantity' => $newQuantity,
        ];

        session()->put('cart', $cart);

        return back()->with('success', 'Buku ditambah ke keranjang!');
    }

    // Hapus buku dari cart session
    public function remove(Book $book)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$book->id])) {
            unset($cart[$book->id]);
            session()->put('cart', $cart);
        }

        return back()->with('success', 'Book removed from cart successfully.');
    }

    // Update jumlah buku di cart, cek max stock
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:' . $book->stock,
        ]);

        $cart = session()->get('cart', []);

        if (isset($cart[$book->id])) {
            $cart[$book->id]['quantity'] = $request->quantity;
            session()->put('cart', $cart);
        }

        return back()->with('success', 'Quantity updated successfully.');
    }
}
