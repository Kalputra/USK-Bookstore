<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    // Tampilin halaman form kontak
    public function index()
    {
        return Inertia::render('User/Contact');
    }

    // Simpen pesan kontak dari user ke DB
    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $user = $request->user();

        ContactMessage::create([
            'user_id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        return redirect()->back()->with('success', 'Pesan Anda telah dikirim.');
    }
}
