import { useState, useEffect } from "react";
import SidebarLayout from "@/Layouts/SidebarLayout";
import { Head, Link } from "@inertiajs/react";
import ScrollAnimation from "@/Components/ScrollAnimation";

export default function Index({ auth, books, categories }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // Load status sidebar dari localStorage
    useEffect(() => {
        const saved = localStorage.getItem("sidebar_collapsed");
        if (saved === "true") {
            setIsCollapsed(true);
        }
    }, []);

    // Toggle sidebar dan simpan ke localStorage
    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("sidebar_collapsed", newState.toString());
        window.dispatchEvent(new Event("toggle-sidebar"));
    };

    // Biar search-nya delay dikit biar nggak sering render
    useEffect(() => {
        const timer = setTimeout(() => {
            // Ntar sini bisa taro logika search tambahan
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Filter buku berdasarkan category yang dipilih
    const filteredBooks = books.filter((book) => {
        const matchCategory =
            selectedCategory === "" ||
            book.category_id === parseInt(selectedCategory);
        const matchSearch =
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <SidebarLayout user={auth.user}>
            <Head title="Explore - Pustaka Abadi" />

            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:bg-gray-100 h-9 w-9"
                        title="Toggle Sidebar"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            color="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                d="M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                            <path
                                d="M9.5 3L9.5 21"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth="1"
                            />
                        </svg>
                        <span className="sr-only">Toggle Sidebar</span>
                    </button>

                    <kbd className="inline-flex items-center gap-1">
                        <span className="bg-gray-100 text-gray-600 inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium">
                            Ctrl
                        </span>
                        <span className="bg-gray-100 text-gray-600 inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium">
                            B
                        </span>
                        <div className="shrink-0 w-px h-full bg-black"></div>
                    </kbd>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Explore
                    </h1>
                </div>
            </div>

            <div className="p-8">
                {/* Search dan Filter */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Cari buku..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Books Grid */}
                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredBooks.map((book, index) => (
                            <ScrollAnimation
                                key={book.id}
                                animation="fade-in-up"
                                delay={index * 50}
                            >
                                <Link
                                    href={route("books.show", book.id)}
                                    className={`group block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${book.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    <div className="aspect-[3/4] bg-gradient-to-br from-red-400 to-red-600 rounded-t-xl overflow-hidden relative">
                                        {book.cover_image ? (
                                            <img
                                                src={`/storage/${book.cover_image}`}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg
                                                    className="w-16 h-16 text-white opacity-50"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                                </svg>
                                            </div>
                                        )}
                                        {book.stock === 0 && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">
                                                    HABIS
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-red-600 transition-colors">
                                            {book.title}
                                        </h3>
                                        <p className="text-gray-600 text-xs mb-2 line-clamp-1">
                                            {book.author}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-red-600 font-bold">
                                                Rp{" "}
                                                {Number(
                                                    book.price,
                                                ).toLocaleString("id-ID")}
                                            </span>
                                            <span className="text-gray-500 text-xs">
                                                {book.stock > 0
                                                    ? `${book.stock} tersedia`
                                                    : "Kosong"}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollAnimation>
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
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            Buku Tidak Ditemukan
                        </h3>
                        <p className="text-gray-600">
                            Coba ubah kata kunci atau kategori pencarian
                        </p>
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
}
