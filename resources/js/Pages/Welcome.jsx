import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome({ auth, books, categories }) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Generate warna random buat cover buku
    const getRandomColor = (id) => {
        const colors = [
            "from-red-700 to-red-600",
            "from-red-800 to-red-700",
            "from-green-400 to-green-500",
            "from-gray-700 to-gray-900",
            "from-blue-800 to-blue-900",
            "from-purple-600 to-purple-700",
            "from-yellow-600 to-yellow-700",
            "from-teal-500 to-teal-600",
            "from-orange-500 to-orange-600",
            "from-pink-500 to-pink-600",
        ];
        return colors[id % colors.length];
    };

    // Filter buku berdasarkan kategori dan pencarian
    const filteredBooks = books.filter((book) => {
        const matchesCategory =
            selectedCategory === "all" ||
            book.category?.name === selectedCategory;
        const matchesSearch =
            searchQuery === "" ||
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <Head title="Pustaka Abadi - Platform Buku Digital" />

            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-900 flex items-center justify-center rounded-lg">
                                    <img
                                        src="/images/icons/Logo-buku.png"
                                        className="w-6 h-6 text-white"
                                        alt="Pustaka Abadi Logo"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                        Pustaka
                                    </div>
                                    <div className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                        Abadi
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center gap-8">
                                <a
                                    href="#eksplorasi"
                                    className="text-gray-700 hover:text-gray-900 font-medium"
                                >
                                    EKSPLORASI
                                </a>
                                <a
                                    href="#faq"
                                    className="text-gray-700 hover:text-gray-900 font-medium"
                                >
                                    FAQ
                                </a>
                            </div>

                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={
                                            auth.user.role === "admin"
                                                ? route("admin.dashboard")
                                                : route("dashboard")
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-full transition"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-full transition"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="text-gray-700 hover:text-gray-900 font-semibold"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
                            Selamat Datang di
                            <br />
                            Pustaka Abadi
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                            Platform digital untuk membaca buku-buku tentang
                            pengetahuan menarik, ilmu berguna, dan ide-ide yang
                            relevan.
                        </p>
                        <Link
                            href={route("login")}
                            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-4 rounded-full text-lg transition"
                        >
                            Mulai Membaca
                        </Link>
                    </div>
                </section>

                <section id="eksplorasi" className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Eksplorasi
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Di sini tersedia berbagai pilihan buku digital yang
                            telah dikurasi dari beragam kategori dan penulis.
                            Temukan buku yang menarik untuk kamu baca, ya!
                        </p>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setIsFilterOpen(!isFilterOpen)
                                    }
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 bg-white"
                                >
                                    <span className="font-medium">
                                        Kategori buku
                                    </span>
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </button>

                                {isFilterOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                                        <div className="p-4">
                                            <div className="space-y-2 mb-4">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        checked={
                                                            selectedCategory ===
                                                            "all"
                                                        }
                                                        onChange={() =>
                                                            setSelectedCategory(
                                                                "all",
                                                            )
                                                        }
                                                        className="mr-3 text-red-600 focus:ring-red-500"
                                                    />
                                                    <span className="text-sm">
                                                        Semua Kategori
                                                    </span>
                                                </label>
                                                {categories &&
                                                    categories.map(
                                                        (category) => (
                                                            <label
                                                                key={
                                                                    category.id
                                                                }
                                                                className="flex items-center"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="category"
                                                                    checked={
                                                                        selectedCategory ===
                                                                        category.name
                                                                    }
                                                                    onChange={() =>
                                                                        setSelectedCategory(
                                                                            category.name,
                                                                        )
                                                                    }
                                                                    className="mr-3 text-red-600 focus:ring-red-500"
                                                                />
                                                                <span className="text-sm">
                                                                    {
                                                                        category.name
                                                                    }
                                                                </span>
                                                            </label>
                                                        ),
                                                    )}
                                            </div>
                                            <div className="flex gap-2 pt-4 border-t">
                                                <button
                                                    onClick={() => {
                                                        setSelectedCategory(
                                                            "all",
                                                        );
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                                                >
                                                    Reset
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setIsFilterOpen(false)
                                                    }
                                                    className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                >
                                                    Terapkan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari buku, penulis, atau kategori..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                    <svg
                                        className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {filteredBooks.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                                {filteredBooks.map((book) => (
                                    <div
                                        key={book.id}
                                        className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition group"
                                    >
                                        <div className="px-3 pt-3 pb-2 bg-white border-b">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-700 font-medium">
                                                    {book.category?.name ||
                                                        "Kategori"}
                                                </span>
                                            </div>
                                        </div>

                                        <div
                                            className={`relative h-72 bg-gradient-to-br ${getRandomColor(book.id)} flex items-center justify-center`}
                                        >
                                            {book.cover_image ? (
                                                <img
                                                    src={`/storage/${book.cover_image}`}
                                                    alt={book.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <svg
                                                    className="w-20 h-20 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                                </svg>
                                            )}
                                        </div>

                                        <div className="p-4 bg-white">
                                            <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-red-600 transition min-h-[2.5rem]">
                                                {book.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 mb-3">
                                                {book.author}
                                            </p>
                                            <div className="text-xs text-gray-700">
                                                Rating: 5/5 (
                                                {Math.floor(
                                                    Math.random() * 50,
                                                ) + 10}{" "}
                                                ulasan)
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg
                                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Buku tidak ditemukan
                                </h3>
                                <p className="text-gray-600">
                                    Coba cari dengan kata kunci lain atau pilih
                                    kategori berbeda.
                                </p>
                            </div>
                        )}

                        <div className="text-center">
                            <Link
                                href={route("login")}
                                className="inline-block text-red-600 hover:text-red-700 font-semibold text-lg"
                            >
                                Lihat Semua Koleksi
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            Mengapa Pustaka Abadi?
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-8 h-8 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Koleksi Lengkap
                                </h3>
                                <p className="text-gray-600">
                                    Ribuan buku berkualitas dari berbagai
                                    kategori
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-8 h-8 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Aman & Terpercaya
                                </h3>
                                <p className="text-gray-600">
                                    Platform terpercaya dengan sistem pembayaran
                                    aman
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-8 h-8 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Akses Cepat
                                </h3>
                                <p className="text-gray-600">
                                    Baca kapan saja, dimana saja dengan mudah
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="faq" className="py-20 px-4 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            Pertanyaan Umum
                        </h2>

                        <div className="space-y-4">
                            <details className="bg-gray-50 p-6 rounded-lg">
                                <summary className="font-semibold text-gray-900 cursor-pointer">
                                    Bagaimana cara mendaftar di Pustaka Abadi?
                                </summary>
                                <p className="mt-4 text-gray-600">
                                    Klik tombol "Daftar" di pojok kanan atas,
                                    isi formulir pendaftaran dengan data yang
                                    valid, dan Anda siap untuk mulai membaca!
                                </p>
                            </details>

                            <details className="bg-gray-50 p-6 rounded-lg">
                                <summary className="font-semibold text-gray-900 cursor-pointer">
                                    Bagaimana cara melakukan pemesanan?
                                </summary>
                                <p className="mt-4 text-gray-600">
                                    Pilih buku yang ingin dibeli, tambahkan ke
                                    keranjang, lalu lanjutkan ke checkout. Isi
                                    alamat pengiriman dan konfirmasi pesanan
                                    Anda.
                                </p>
                            </details>

                            <details className="bg-gray-50 p-6 rounded-lg">
                                <summary className="font-semibold text-gray-900 cursor-pointer">
                                    Berapa lama waktu pengiriman?
                                </summary>
                                <p className="mt-4 text-gray-600">
                                    Waktu pengiriman bervariasi tergantung
                                    lokasi Anda. biasanya 3-7 hari kerja untuk
                                    area Jabodetabek dan sekitarnya.
                                </p>
                            </details>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-4 bg-red-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Mulai Perjalanan Membaca Anda Hari Ini
                        </h2>
                        <p className="text-xl text-red-100 mb-8">
                            Bergabunglah dengan ribuan pembaca lainnya dan
                            temukan buku favorit Anda
                        </p>
                        <Link
                            href={route("register")}
                            className="inline-block bg-white hover:bg-gray-100 text-red-600 font-semibold px-10 py-4 rounded-full text-lg transition"
                        >
                            Daftar Sekarang - Gratis !
                        </Link>
                    </div>
                </section>

                <footer className="bg-gray-900 text-white py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-white flex items-center justify-center rounded-lg">
                                        <svg
                                            className="w-6 h-6 text-gray-900"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold uppercase">
                                            Pustaka
                                        </div>
                                        <div className="text-sm font-bold uppercase">
                                            Abadi
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Platform digital untuk membeli buku
                                    berkualitas
                                </p>
                            </div>

                            <div>
                                <h4 className="font-bold mb-4">Navigasi</h4>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li>
                                        <a
                                            href="#eksplorasi"
                                            className="hover:text-white"
                                        >
                                            Eksplorasi
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#faq"
                                            className="hover:text-white"
                                        >
                                            FAQ
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold mb-4">Kategori</h4>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-white"
                                        >
                                            Novel
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-white"
                                        >
                                            Klasik
                                        </a>
                                    </li>
                                                                        <li>
                                        <a
                                            href="#"
                                            className="hover:text-white"
                                        >
                                            Fantasi
                                        </a>
                                    </li>
                                                                        <li>
                                        <a
                                            href="#"
                                            className="hover:text-white"
                                        >
                                            Biografi
                                        </a>
                                    </li>
                                                                        <li>
                                        <a
                                            href="#"
                                            className="hover:text-white"
                                        >
                                            Sejarah
                                        </a>
                                    </li>
                                                                        <li>
                                        <a
                                            href="#"
                                            className="hover:text-white"
                                        >
                                            Ensiklopedia
                                        </a>
                                    </li>
                                                                        <li>
                                        <a
                                            href="#"
                                            className="hover:text-white"
                                        >
                                            Referensi
                                        </a>
                                    </li>
                                                                        <li>
                                        <a
                                            href="#"
                                            className="hover:text-white"
                                        >
                                            Agama
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold mb-4">Kontak</h4>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li>Email: pustaka.abadi@email.com</li>
                                    <li>Telepon: (021) 123-4567</li>
                                    <li>Jakarta, Indonesia</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                            <p>
                                © Copyright Pustaka Abadi, 2026.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
