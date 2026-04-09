<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', auth()->id())
            ->with('orderItems.book')
            ->latest()
            ->get();

        return Inertia::render('User/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
            'phone' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return back()->with('error', 'Your cart is empty.');
        }

        $total = 0;
        $order = Order::create([
            'user_id' => auth()->id(),
            'order_number' => 'ORD-' . strtoupper(Str::random(10)),
            'total_amount' => 0,
            'status' => 'pending',
            'payment_status' => 'pending',
            'payment_method' => 'cod',
            'shipping_address' => $request->shipping_address,
            'phone' => $request->phone,
            'notes' => $request->notes,
        ]);

        foreach ($cart as $id => $details) {
            $book = Book::find($id);
            if ($book && $book->stock >= $details['quantity']) {
                $subtotal = $book->price * $details['quantity'];
                
                OrderItem::create([
                    'order_id' => $order->id,
                    'book_id' => $book->id,
                    'quantity' => $details['quantity'],
                    'price' => $book->price,
                    'subtotal' => $subtotal,
                ]);

                $book->decrement('stock', $details['quantity']);
                $total += $subtotal;
            }
        }

        $order->update(['total_amount' => $total]);
        session()->forget('cart');

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order placed successfully.');
    }

    public function show(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load('orderItems.book');

        return Inertia::render('User/Orders/Show', [
            'order' => $order,
        ]);
    }

    public function confirmPayment(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->update([
            'status' => 'completed',
            'payment_status' => 'paid',
        ]);

        return back()->with('success', 'Pembayaran berhasil dikonfirmasi!');
    }
}
