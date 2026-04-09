import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, book, categories }) {
    // Form data - ambil data buku yang mau diedit
    const { data, setData, post, processing, errors } = useForm({
        category_id: book.category_id || "",
        title: book.title || "",
        author: book.author || "",
        publisher: book.publisher || "",
        description: book.description || "",
        price: book.price || "",
        stock: book.stock || "",
        isbn: book.isbn || "",
        pages: book.pages || "",
        publication_year: book.publication_year || "",
        cover_image: null,
        _method: "PUT",
    });

    // Submit update ke server
    const submit = (e) => {
        e.preventDefault();
        post(route("admin.books.update", book.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Buku
                </h2>
            }
        >
            <Head title="Edit Buku" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Form Edit Buku
                            </h3>

                            {/* Form edit buku */}
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="title"
                                            value="Judul Buku *"
                                        />
                                        <TextInput
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.title}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="author"
                                            value="Penulis *"
                                        />
                                        <TextInput
                                            id="author"
                                            type="text"
                                            name="author"
                                            value={data.author}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "author",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.author}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="category_id"
                                            value="Kategori *"
                                        />
                                        <select
                                            id="category_id"
                                            name="category_id"
                                            value={data.category_id}
                                            className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "category_id",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        >
                                            <option value="">
                                                Pilih Kategori
                                            </option>
                                            {categories.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.category_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="publisher"
                                            value="Penerbit"
                                        />
                                        <TextInput
                                            id="publisher"
                                            type="text"
                                            name="publisher"
                                            value={data.publisher}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "publisher",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.publisher}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="price"
                                            value="Harga *"
                                        />
                                        <TextInput
                                            id="price"
                                            type="number"
                                            name="price"
                                            value={data.price}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.price}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="stock"
                                            value="Stok *"
                                        />
                                        <TextInput
                                            id="stock"
                                            type="number"
                                            name="stock"
                                            value={data.stock}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("stock", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.stock}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="isbn"
                                            value="ISBN"
                                        />
                                        <TextInput
                                            id="isbn"
                                            type="text"
                                            name="isbn"
                                            value={data.isbn}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("isbn", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.isbn}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="pages"
                                            value="Jumlah Halaman"
                                        />
                                        <TextInput
                                            id="pages"
                                            type="number"
                                            name="pages"
                                            value={data.pages}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("pages", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.pages}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="publication_year"
                                            value="Tahun Terbit"
                                        />
                                        <TextInput
                                            id="publication_year"
                                            type="number"
                                            name="publication_year"
                                            value={data.publication_year}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "publication_year",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.publication_year}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="cover_image"
                                            value="Cover Buku"
                                        />
                                        <input
                                            id="cover_image"
                                            type="file"
                                            name="cover_image"
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "cover_image",
                                                    e.target.files[0],
                                                )
                                            }
                                            accept="image/*"
                                        />
                                        <InputError
                                            message={errors.cover_image}
                                            className="mt-2"
                                        />
                                        {/* Tampilin cover yang sekarang */}
                                        {book.cover_image && (
                                            <div className="mt-2">
                                                <img
                                                    src={`/storage/${book.cover_image}`}
                                                    alt="Current cover"
                                                    className="h-20 w-auto rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="description"
                                        value="Deskripsi"
                                    />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        rows="4"
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Tombol Update dan Batal */}
                                <div className="flex items-center justify-end mt-6 space-x-2">
                                    <Link
                                        href={route("admin.books.index")}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                                        disabled={processing}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
