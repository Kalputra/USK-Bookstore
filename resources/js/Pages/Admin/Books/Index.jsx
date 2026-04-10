import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

// Halaman admin buat liat + kelola semua buku (list, edit, hapus)
export default function Index({ auth, books }) {
    const { delete: destroy } = useForm();

    // Handle hapus buku - pastiin dulu sebelum hapus
    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus buku ini?")) {
            destroy(route("admin.books.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kelola Buku
                </h2>
            }
        >
            <Head title="Kelola Buku" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header tabel + tombol tambah */}
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Daftar Buku
                            </h3>
                            <Link
                                href={route("admin.books.create")}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                            >
                                + Tambah Buku
                            </Link>
                        </div>

                        {/* Tabel list buku */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            #
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Cover
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Judul Buku
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Penulis
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Harga
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Stok
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {books.length > 0 ? (
                                        books.map((book, index) => (
                                            <tr key={book.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="h-16 w-12 bg-gradient-to-br from-red-400 to-red-600 rounded flex items-center justify-center">
                                                        {book.cover_image ? (
                                                            <img
                                                                src={`/storage/${book.cover_image}`}
                                                                alt={book.title}
                                                                className="h-full w-full object-cover rounded"
                                                            />
                                                        ) : (
                                                            <svg
                                                                className="w-6 h-6 text-white"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {book.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {book.author}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {book.category?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    Rp{" "}
                                                    {Number(
                                                        book.price,
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {book.stock}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <Link
                                                        href={route(
                                                            "admin.books.edit",
                                                            book.id,
                                                        )}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                book.id,
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="px-6 py-4 text-center text-sm text-gray-500"
                                            >
                                                Belum ada buku
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
