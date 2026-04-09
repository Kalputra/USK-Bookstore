import SidebarLayout from "@/Layouts/SidebarLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import ScrollAnimation, {
    useScrollAnimationStyles,
} from "@/Components/ScrollAnimation";

export default function Dashboard({ auth, categories, books }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Init animasi scroll
    useScrollAnimationStyles();

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

    return (
        <SidebarLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between sticky top-0 z-50">
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

                    <h1 className="text-2xl font-bold text-gray-900">Home</h1>
                </div>
            </div>

            <div className="p-8">
                <ScrollAnimation animation="fade-in-up" delay={0}>
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">
                                Rekomendasi
                            </h2>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                                    <svg
                                        className="w-5 h-5 text-gray-600"
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
                                </button>
                                <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                                    <svg
                                        className="w-5 h-5 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="flex gap-6">
                                {books.map((book, index) => (
                                    <ScrollAnimation
                                        key={book.id}
                                        animation="fade-in-up"
                                        delay={index * 100}
                                    >
                                        <Link
                                            href={route("books.show", book.id)}
                                            className="flex-shrink-0 w-44 group"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-gray-600 font-medium">
                                                    {book.category?.name ||
                                                        "Kategori"}
                                                </span>
                                            </div>

                                            <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-3 overflow-hidden group-hover:shadow-xl transition">
                                                {book.cover_image ? (
                                                    <img
                                                        src={`/storage/${book.cover_image}`}
                                                        alt={book.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
                                                        <svg
                                                            className="w-16 h-16 text-white"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            <h3 className="font-bold text-sm text-gray-900 line-clamp-2 mb-1 group-hover:text-red-600 transition min-h-[2.5rem]">
                                                {book.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 mb-2">
                                                {book.author}
                                            </p>
                                            <div className="text-xs text-gray-700">
                                                Rating: 5/5 (
                                                {Math.floor(
                                                    Math.random() * 50,
                                                ) + 10}{" "}
                                                ulasan)
                                            </div>
                                        </Link>
                                    </ScrollAnimation>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-in-up" delay={300}>
                    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">
                            Temukan Buku Favorit Anda
                        </h3>
                        <p className="text-red-100 mb-6">
                            Ribuan buku berkualitas menunggu untuk Anda jelajahi
                        </p>
                        <Link
                            href={route("books.index")}
                            className="inline-block bg-white text-red-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition hover:scale-105"
                        >
                            Mulai Eksplorasi
                        </Link>
                    </div>
                </ScrollAnimation>
            </div>
        </SidebarLayout>
    );
}
