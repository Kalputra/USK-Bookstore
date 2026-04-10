import SidebarLayout from "@/Layouts/SidebarLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { useState } from "react";

// Halaman keranjang belanja user + form checkout COD
export default function Index({ auth, cartItems, total }) {
    const { delete: destroy, processing } = useForm();
    const [showCheckout, setShowCheckout] = useState(false);

    // Form data buat checkout
    const {
        data,
        setData,
        post,
        processing: checkoutProcessing,
        errors,
        reset,
    } = useForm({
        shipping_address: auth.user.address || "",
        phone: auth.user.phone || "",
        notes: "",
    });

    // Hapus buku dari keranjang
    const handleRemove = (bookId) => {
        if (confirm("Yakin menghapus buku ini dari keranjang?")) {
            destroy(route("cart.remove", bookId));
        }
    };

    // Update jumlah buku yang mau dibeli
    const handleQuantityChange = (bookId, newQuantity) => {
        if (newQuantity < 1) return;

        router.put(route("cart.update", bookId), {
            quantity: newQuantity,
        });
    };

    // Proses checkout - kirim pesanan
    const handleCheckout = (e) => {
        e.preventDefault();
        post(route("orders.store"), {
            onSuccess: () => {
                setShowCheckout(false);
                reset();
            },
        });
    };

    return (
        <SidebarLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Keranjang Belanja
                </h2>
            }
        >
            <Head title="Keranjang" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* List buku di keranjang */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.book.id}
                                        className="bg-white rounded-lg shadow p-4"
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-24 h-32 flex-shrink-0 bg-gradient-to-br from-red-400 to-red-600 rounded flex items-center justify-center">
                                                {item.book.cover_image ? (
                                                    <img
                                                        src={`/storage/${item.book.cover_image}`}
                                                        alt={item.book.title}
                                                        className="h-full w-full object-cover rounded"
                                                    />
                                                ) : (
                                                    <svg
                                                        className="w-12 h-12 text-white"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <Link
                                                    href={route(
                                                        "books.show",
                                                        item.book.id,
                                                    )}
                                                    className="font-bold text-gray-900 hover:text-red-600 transition"
                                                >
                                                    {item.book.title}
                                                </Link>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {item.book.author}
                                                </p>

                                                {/* Tombol +/- jumlah buku */}
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-sm text-gray-600">
                                                        Jumlah:
                                                    </span>
                                                    <div className="flex items-center border border-gray-300 rounded">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item.book
                                                                        .id,
                                                                    item.quantity -
                                                                        1,
                                                                )
                                                            }
                                                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3 py-1 font-semibold">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item.book
                                                                        .id,
                                                                    item.quantity +
                                                                        1,
                                                                )
                                                            }
                                                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition"
                                                            disabled={
                                                                item.quantity >=
                                                                item.book.stock
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <span className="text-xs text-gray-500">
                                                        {item.book.stock > 0
                                                            ? `(Max: ${item.book.stock})`
                                                            : "Tidak tersedia"}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-lg font-bold text-red-600">
                                                            Rp{" "}
                                                            {Number(
                                                                item.subtotal,
                                                            ).toLocaleString(
                                                                "id-ID",
                                                            )}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleRemove(
                                                                item.book.id,
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800 text-sm font-semibold"
                                                        disabled={processing}
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Form checkout */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                        Ringkasan Belanja
                                    </h3>
                                    <div className="border-t border-b border-gray-200 py-4 mb-4">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-600">
                                                Subtotal
                                            </span>
                                            <span className="font-semibold">
                                                Rp{" "}
                                                {Number(total).toLocaleString(
                                                    "id-ID",
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-600">
                                                Ongkir
                                            </span>
                                            <span className="font-semibold text-green-600">
                                                GRATIS
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-lg font-bold text-gray-900">
                                            Total
                                        </span>
                                        <span className="text-xl font-bold text-red-600">
                                            Rp{" "}
                                            {Number(total).toLocaleString(
                                                "id-ID",
                                            )}
                                        </span>
                                    </div>

                                    {!showCheckout ? (
                                        <button
                                            onClick={() =>
                                                setShowCheckout(true)
                                            }
                                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                                        >
                                            Checkout Sekarang
                                        </button>
                                    ) : (
                                        <form
                                            onSubmit={handleCheckout}
                                            className="mt-4 space-y-4"
                                        >
                                            <div>
                                                <InputLabel
                                                    htmlFor="shipping_address"
                                                    value="Alamat Pengiriman *"
                                                />
                                                <textarea
                                                    id="shipping_address"
                                                    placeholder="Masukkan alamat pengiriman"
                                                    value={
                                                        data.shipping_address
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "shipping_address",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                                                    rows="3"
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        errors.shipping_address
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="phone"
                                                    value="Nomor Telepon *"
                                                />
                                                <TextInput
                                                    id="phone"
                                                    type="number"
                                                    placeholder="Masukkan nomor telepon"
                                                    value={data.phone}
                                                    onChange={(e) =>
                                                        setData(
                                                            "phone",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="mt-1 block w-full"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.phone}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div>
                                                <InputLabel
                                                    htmlFor="notes"
                                                    value="Catatan (Opsional)"
                                                />
                                                <textarea
                                                    id="notes"
                                                    value={data.notes}
                                                    onChange={(e) =>
                                                        setData(
                                                            "notes",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                                                    rows="2"
                                                />
                                                <InputError
                                                    message={errors.notes}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                                <p className="text-sm text-yellow-800 font-semibold">
                                                    💰 Metode Pembayaran: COD
                                                    (Cash on Delivery)
                                                </p>
                                                <p className="text-xs text-yellow-700 mt-1">
                                                    Bayar pas barang diterima
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowCheckout(false)
                                                    }
                                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                                                    disabled={
                                                        checkoutProcessing
                                                    }
                                                >
                                                    {checkoutProcessing
                                                        ? "Memproses..."
                                                        : "Buat Pesanan"}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
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
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Keranjang Kosong
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Belum ada buku di keranjangmu
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
            </div>
        </SidebarLayout>
    );
}
