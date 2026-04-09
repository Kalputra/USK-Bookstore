<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Pengembangan Diri', 'description' => 'Buku untuk mengembangkan diri'],
            ['name' => 'Sains', 'description' => 'Buku ilmu pengetahuan dan sains'],
            ['name' => 'Karier', 'description' => 'Buku tentang pengembangan karir'],
            ['name' => 'Politik', 'description' => 'Buku politik dan pemerintahan'],
            ['name' => 'Biologi', 'description' => 'Buku tentang biologi'],
            ['name' => 'Geologi', 'description' => 'Buku tentang geologi'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
            ]);
        }
    }
}