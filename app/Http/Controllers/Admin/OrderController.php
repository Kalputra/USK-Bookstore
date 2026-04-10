<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    // Tampilin semua order user buat admin pantau
    public function index()
    {
        $orders = Order::with('user')->latest()->get();
        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    // Detail order lengkap + user + item buku-itemnya
    public function show(Order $order)
    {
        $order->load('user', 'orderItems.book');
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    // Update status order (pending->processing->shipped dst)
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order->update(['status' => $request->status]);

        return back()->with('success', 'Order status updated successfully.');
    }
}
