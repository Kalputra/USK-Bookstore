<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'author',
        'publisher',
        'description',
        'cover_image',
        'price',
        'stock',
        'isbn',
        'pages',
        'publication_year',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    // Relasi ke parent category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Relasi ke item-item order yang beli buku ini (1 buku banyak order item)
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
