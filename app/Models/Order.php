<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'total_amount',
        'status',
        'payment_status',
        'payment_method',
        'shipping_address',
        'phone',
        'notes',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
    ];

    // Relasi ke user yang pesen
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke semua item di order ini
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
