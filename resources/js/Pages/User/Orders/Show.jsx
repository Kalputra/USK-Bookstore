import SidebarLayout from '@/Layouts/SidebarLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Show({ auth, order }) {
    const { flash } = usePage().props;
    const { post, processing } = useForm();

    const handleConfirmPayment = () => {
        if (confirm('Apakah Anda yakin ingin mengkonfirmasi pembayaran? Pembayaran akan dilakukan saat barang diterima (COD).')) {
            post(route('orders.confirmPayment', order.id));
        }
    };

    const isPaymentPending = order.payment_status === 'pending' && order.status !== 'completed';

    return (
        <SidebarLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Pesanan</h2>}
        >
            <Head title="Detail Pesanan" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Success Message */}
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <Link
                                href={route('orders.index')}
                                className="text-red-600 hover:text-red-700 mb-4 inline-block"
                            >
                                Kembali ke Daftar Pesanan
                            </Link>

                            {/* Order Header */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-2xl hfont-bold text-gray-900">Order #{order.order_number}</h1>
                                        <p className="text-gray-600">
                                            Dibuat pada {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.status === 'completed' ? 'Selesai' : order.status}
                                        </span>
                                        <p className="text-sm text-gray-600 mt-2">
                                            {order.payment_status === 'paid' ? ' Sudah Dibayar' : 'Belum Dibayar'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Info */}
                            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">💰</span>
                                    <div>
                                        <p className="font-semibold text-yellow-800">Metode Pembayaran: COD (Cash on Delivery)</p>
                                        <p className="text-sm text-yellow-700">Pembayaran dilakukan langsung saat barang diterima</p>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Informasi Pengiriman</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="mb-2">
                                        <p className="text-sm text-gray-600">Alamat</p>
                                        <p className="font-semibold">{order.shipping_address}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-sm text-gray-600">Telepon</p>
                                        <p className="font-semibold">{order.phone}</p>
                                    </div>
                                    {order.notes && (
                                        <div>
                                            <p className="text-sm text-gray-600">Catatan</p>
                                            <p className="font-semibold">{order.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Detail Pesanan</h3>
                                <div className="space-y-3">
                                    {order.order_items?.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="w-16 h-20 flex-shrink-0 bg-gradient-to-br from-red-400 to-red-600 rounded flex items-center justify-center">
                                                {item.book?.cover_image ? (
                                                    <img
                                                        src={`/storage/${item.book.cover_image}`}
                                                        alt={item.book.title}
                                                        className="h-full w-full object-cover rounded"
                                                    />
                                                ) : (
                                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900">{item.book?.title}</h4>
                                                <p className="text-sm text-gray-600">{item.book?.author}</p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-sm text-gray-600">
                                                        {item.quantity} x Rp {Number(item.price).toLocaleString('id-ID')}
                                                    </span>
                                                    <span className="font-bold text-red-600">
                                                        Rp {Number(item.subtotal).toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-gray-900">Total Pembayaran</span>
                                    <span className="text-2xl font-bold text-red-600">
                                        Rp {Number(order.total_amount).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>

                            {/* Confirm Payment Button */}
                            {isPaymentPending && (
                                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                                    <h3 className="text-lg font-bold text-green-800 mb-2">Konfirmasi Pembayaran</h3>
                                    <p className="text-sm text-green-700 mb-4">
                                        Klik tombol di bawah untuk mengkonfirmasi pesanan Anda. 
                                        Pembayaran akan dilakukan secara COD (Cash on Delivery) saat barang diterima.
                                    </p>
                                    <button
                                        onClick={handleConfirmPayment}
                                        disabled={processing}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
                                    >
                                        {processing ? 'Memproses...' : ' Konfirmasi'}
                                    </button>
                                </div>
                            )}

                            {/* Already Completed Message */}
                            {order.status === 'completed' && (
                                <div className="mt-6 p-6 bg-green-100 border border-green-300 rounded-lg text-center">
                                    <h3 className="text-lg font-bold text-green-800">Pesanan Selesai</h3>
                                    <p className="text-sm text-green-700">
                                        Terima kasih! Pesanan Anda telah selesai dan dikonfirmasi.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
