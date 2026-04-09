import SidebarLayout from "@/Layouts/SidebarLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Show({ auth, book }) {
    const { post, processing } = useForm();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Load status sidebar dari localStorage pas pertama kali dibuka
    useEffect(() => {
        const saved = localStorage.getItem("sidebar_collapsed");
        if (saved === "true") {
            setIsCollapsed(true);
        }
    }, []);

    // Toggle sidebar dan simpan preferensi ke localStorage
    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("sidebar_collapsed", newState.toString());
        window.dispatchEvent(new Event("toggle-sidebar"));
    };

    // Handle tombol buat masukkin buku ke keranjang
    const handleAddToCart = () => {
        post(route("cart.add", book.id), {
            onSuccess: () => {
                // Redirect ke halaman keranjang setelah berhasil
                window.location.href = route("cart.index");
            },
        });
    };

    return (
        <SidebarLayout user={auth.user}>
            <Head title={book.title} />

            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    {/* Tombol toggle sidebar */}
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

                    {/* Shortcut keyboard Ctrl+B */}
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
                        Detail Buku
                    </h1>
                </div>
            </div>

            <div className="p-8">
                {/* Tombol buat balik ke halaman list buku */}
                <Link
                    href={route("books.index")}
                    className="text-gray-500 hover:text-gray-700 mb-6 inline-flex items-center gap-2 transition"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Kembali
                </Link>

                {/* Card buat nampilin detail buku */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        {/* Cover buku */}
                        <div className="lg:col-span-4 p-8 bg-gray-50 flex items-center justify-center">
                            <div className="relative w-full max-w-xs">
                                <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden shadow-lg">
                                    {book.cover_image ? (
                                        <img
                                            src={`/storage/${book.cover_image}`}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
                                            <svg
                                                className="w-24 h-24 text-white/80"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Detail-info buku */}
                        <div className="lg:col-span-8 p-8">
                            {/* Kategori */}
                            <div className="mb-4">
                                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                                    {book.category?.name}
                                </span>
                            </div>

                            {/* Judul */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {book.title}
                            </h1>
                            <p className="text-lg text-gray-500 mb-6">
                                oleh{" "}
                                <span className="text-gray-700">
                                    {book.author}
                                </span>
                            </p>

                            {/* Harga dan Stok */}
                            <div className="flex items-center justify-between py-4 border-y border-gray-100 mb-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Harga
                                    </p>
                                    <p className="text-3xl font-bold text-red-600">
                                        Rp{" "}
                                        {Number(book.price).toLocaleString(
                                            "id-ID",
                                        )}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500 mb-1">
                                        Ketersediaan
                                    </p>
                                    {book.stock > 0 ? (
                                        <p className="text-lg font-semibold text-green-600">
                                            Tersedia ({book.stock} buku)
                                        </p>
                                    ) : (
                                        <p className="text-lg font-semibold text-red-500">
                                            Stok Habis
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Info tambahan buku (penerbit, ISBN, dll) */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {book.publisher && (
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Penerbit
                                        </p>
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {book.publisher}
                                        </p>
                                    </div>
                                )}
                                {book.isbn && (
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">
                                            ISBN
                                        </p>
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {book.isbn}
                                        </p>
                                    </div>
                                )}
                                {book.pages && (
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Halaman
                                        </p>
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {book.pages}
                                        </p>
                                    </div>
                                )}
                                {book.publication_year && (
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Tahun
                                        </p>
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {book.publication_year}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Deskripsi buku */}
                            {book.description && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Deskripsi
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {book.description}
                                    </p>
                                </div>
                            )}

                            {/* Tombol buat masukkin ke keranjang */}
                            <button
                                onClick={handleAddToCart}
                                disabled={processing || book.stock <= 0}
                                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
                                    book.stock > 0
                                        ? "bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {book.stock > 0
                                    ? "Tambahkan ke Keranjang"
                                    : "Stok Habis"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
