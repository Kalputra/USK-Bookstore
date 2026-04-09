import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Show({ auth, order }) {
    // Form data untuk update status pesanan
    const { data, setData, patch, processing } = useForm({
        status: order.status,
    });

    // Handle update status pesanan
    const handleStatusUpdate = () => {
        patch(route("admin.orders.updateStatus", order.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Pesanan
                </h2>
            }
        >
            <Head title="Detail Pesanan" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Link kembali ke list pesanan */}
                            <Link
                                href={route("admin.orders.index")}
                                className="text-red-600 hover:text-red-700 mb-4 inline-block"
                            >
                                Kembali
                            </Link>

                            {/* Info Pesanan */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Order #{order.order_number}
                                </h1>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Customer
                                        </p>
                                        <p className="font-semibold">
                                            {order.user?.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {order.user?.email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Tanggal
                                        </p>
                                        <p className="font-semibold">
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString("id-ID", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Update Status Pesanan */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Update Status Pesanan
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="flex-1 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">
                                            Processing
                                        </option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">
                                            Delivered
                                        </option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                    <button
                                        onClick={handleStatusUpdate}
                                        disabled={processing}
                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>

                            {/* Info Pengiriman */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    Informasi Pengiriman
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="mb-2">
                                        <p className="text-sm text-gray-600">
                                            Alamat
                                        </p>
                                        <p className="font-semibold">
                                            {order.shipping_address}
                                        </p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-sm text-gray-600">
                                            Telepon
                                        </p>
                                        <p className="font-semibold">
                                            {order.phone}
                                        </p>
                                    </div>
                                    {order.notes && (
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                Catatan
                                            </p>
                                            <p className="font-semibold">
                                                {order.notes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Detail Pesanan (Items) */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    Detail Pesanan
                                </h3>
                                <div className="space-y-3">
                                    {order.order_items?.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-semibold">
                                                    {item.book?.title}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {item.quantity} x Rp{" "}
                                                    {Number(
                                                        item.price,
                                                    ).toLocaleString("id-ID")}
                                                </p>
                                            </div>
                                            <p className="font-bold text-red-600">
                                                Rp{" "}
                                                {Number(
                                                    item.subtotal,
                                                ).toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-gray-900">
                                        Total
                                    </span>
                                    <span className="text-2xl font-bold text-red-600">
                                        Rp{" "}
                                        {Number(
                                            order.total_amount,
                                        ).toLocaleString("id-ID")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
