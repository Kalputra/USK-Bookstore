import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ScrollAnimation, {
    useScrollAnimationStyles,
} from "@/Components/ScrollAnimation";

export default function AdminDashboard({ auth, stats, recent_orders }) {
    // Biar animasi scroll-nya keluar
    useScrollAnimationStyles();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Kartu-kartu statistik */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <ScrollAnimation animation="fade-in-up" delay={0}>
                            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Total Buku
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {stats.total_books}
                                        </p>
                                    </div>
                                    <div className="bg-blue-100 rounded-full p-3">
                                        <svg
                                            className="w-8 h-8 text-blue-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>

                        <ScrollAnimation animation="fade-in-up" delay={100}>
                            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Total Kategori
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {stats.total_categories}
                                        </p>
                                    </div>
                                    <div className="bg-green-100 rounded-full p-3">
                                        <svg
                                            className="w-8 h-8 text-green-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>

                        <ScrollAnimation animation="fade-in-up" delay={200}>
                            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Total Pesanan
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {stats.total_orders}
                                        </p>
                                    </div>
                                    <div className="bg-yellow-100 rounded-full p-3">
                                        <svg
                                            className="w-8 h-8 text-yellow-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>

                        <ScrollAnimation animation="fade-in-up" delay={300}>
                            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Total User
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {stats.total_users}
                                        </p>
                                    </div>
                                    <div className="bg-purple-100 rounded-full p-3">
                                        <svg
                                            className="w-8 h-8 text-purple-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>

                    {/* Tombol-tombol shortcut */}
                    <ScrollAnimation animation="fade-in-up" delay={400}>
                        <div className="bg-white rounded-lg shadow p-6 mb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Link
                                    href={route("admin.books.create")}
                                    className="flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 rounded-lg p-4 transition hover:scale-105"
                                >
                                    <svg
                                        className="w-8 h-8 text-red-600 mb-2"
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
                                    <span className="text-sm font-semibold text-gray-900">
                                        Tambah Buku
                                    </span>
                                </Link>

                                <Link
                                    href={route("admin.categories.create")}
                                    className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 rounded-lg p-4 transition hover:scale-105"
                                >
                                    <svg
                                        className="w-8 h-8 text-green-600 mb-2"
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
                                    <span className="text-sm font-semibold text-gray-900">
                                        Tambah Kategori
                                    </span>
                                </Link>

                                <Link
                                    href={route("admin.books.index")}
                                    className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 rounded-lg p-4 transition hover:scale-105"
                                >
                                    <svg
                                        className="w-8 h-8 text-blue-600 mb-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                    </svg>
                                    <span className="text-sm font-semibold text-gray-900">
                                        Kelola Buku
                                    </span>
                                </Link>

                                <Link
                                    href={route("admin.orders.index")}
                                    className="flex flex-col items-center justify-center bg-yellow-50 hover:bg-yellow-100 rounded-lg p-4 transition hover:scale-105"
                                >
                                    <svg
                                        className="w-8 h-8 text-yellow-600 mb-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <span className="text-sm font-semibold text-gray-900">
                                        Kelola Pesanan
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </ScrollAnimation>

                    {/* Tabel pesanan terbaru */}
                    <ScrollAnimation animation="fade-in-up" delay={500}>
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Pesanan Terbaru
                                    </h3>
                                    {stats.pending_orders > 0 && (
                                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                                            {stats.pending_orders} Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Order #
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recent_orders.length > 0 ? (
                                            recent_orders.map((order) => (
                                                <tr
                                                    key={order.id}
                                                    className="hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {order.order_number}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {order.user?.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        Rp{" "}
                                                        {Number(
                                                            order.total_amount,
                                                        ).toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                order.status ===
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
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <Link
                                                            href={route(
                                                                "admin.orders.show",
                                                                order.id,
                                                            )}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Detail
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                                >
                                                    Belum ada pesanan
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
