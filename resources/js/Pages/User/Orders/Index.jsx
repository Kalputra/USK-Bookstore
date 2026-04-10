import SidebarLayout from "@/Layouts/SidebarLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

// Halaman user liat riwayat pesanan sendiri
export default function Index({ auth, orders }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

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
            <Head title="Pesanan Saya" />

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
                        Pesanan Saya
                    </h1>
                </div>
            </div>

            <div className="p-8">
                {/* List pesanan user */}
                {orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-lg shadow"
                            >
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-gray-900">
                                                Order #{order.order_number}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {new Date(
                                                    order.created_at,
                                                ).toLocaleDateString("id-ID")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    order.status === "completed"
                                                        ? "bg-green-100 text-green-800"
                                                        : order.status ===
                                                            "pending"
                                                          ? "bg-yellow-100 text-yellow-800"
                                                          : order.status ===
                                                              "processing"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : order.status ===
                                                                "shipped"
                                                              ? "bg-purple-100 text-purple-800"
                                                              : order.status ===
                                                                  "delivered"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {order.status === "completed"
                                                    ? "Selesai"
                                                    : order.status}
                                            </span>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {order.payment_status === "paid"
                                                    ? "Sudah Dibayar"
                                                    : "Belum Dibayar"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Item-item dalam pesanan */}
                                    <div className="space-y-2 mb-4">
                                        {order.order_items?.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between items-center text-sm"
                                            >
                                                <span className="text-gray-700">
                                                    {item.book?.title} x{" "}
                                                    {item.quantity}
                                                </span>
                                                <span className="font-semibold">
                                                    Rp{" "}
                                                    {Number(
                                                        item.subtotal,
                                                    ).toLocaleString("id-ID")}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center border-t pt-4">
                                        <span className="text-lg font-bold text-gray-900">
                                            Total
                                        </span>
                                        <span className="text-xl font-bold text-red-600">
                                            Rp{" "}
                                            {Number(
                                                order.total_amount,
                                            ).toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 flex justify-end">
                                    <Link
                                        href={route("orders.show", order.id)}
                                        className="text-red-600 hover:text-red-700 font-semibold"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <svg
                            className="w-24 h-24 text-gray-400 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Belum Ada Pesanan
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Kamu belum punya pesanan sama sekali
                        </p>
                        <Link
                            href={route("books.index")}
                            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                        >
                            Mulai Belanja
                        </Link>
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
}
