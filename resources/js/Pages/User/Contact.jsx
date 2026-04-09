import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function Contact({ auth }) {
    // Form data untuk pesan kontak
    const { data, setData, post, processing, errors, reset } = useForm({
        subject: "",
        message: "",
    });

    // Submit form pesan ke server
    const submit = (e) => {
        e.preventDefault();
        post(route("contact.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Hubungi Kami
                </h2>
            }
        >
            <Head title="Hubungi Kami" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Hubungi Admin
                                </h3>
                                <p className="text-gray-600">
                                    Ada pertanyaan atau masalah? Kirim pesan
                                    kepada kami dan kami akan segera merespons.
                                </p>
                            </div>

                            {/* Form kirim pesan ke admin */}
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel
                                        htmlFor="subject"
                                        value="Subjek *"
                                    />
                                    <TextInput
                                        id="subject"
                                        type="text"
                                        name="subject"
                                        value={data.subject}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("subject", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.subject}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="message"
                                        value="Pesan *"
                                    />
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={data.message}
                                        className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                        rows="6"
                                        required
                                    />
                                    <InputError
                                        message={errors.message}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                                        disabled={processing}
                                    >
                                        Kirim Pesan
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
