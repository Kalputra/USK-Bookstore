import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    // Form registrasi - kumpulin data user baru
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        address: "",
    });

    // Clear password waktu component dihapus dari DOM
    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    // Submit form registrasi ke server
    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <>
            <Head title="Daftar" />

            <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] relative overflow-hidden py-12">
                {/* Dekorasi lingkaran-lingkaran di background */}
                <div className="absolute top-0 left-0 w-96 h-96 border-2 border-dashed border-gray-700 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 border-2 border-dashed border-gray-700 rounded-full translate-x-1/2 translate-y-1/2"></div>

                <div className="w-full max-w-md z-10 px-6">
                    <div className="text-center mb-8">
                        {/* Logo aplikasi */}
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl mb-6">
                            <svg
                                className="w-10 h-10 text-gray-800"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-semibold text-white mb-8">
                            Daftar Akun Baru
                        </h1>
                    </div>

                    {/* Form registrasi user baru */}
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                placeholder="Nama Lengkap"
                                className="w-full px-4 py-3 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder-gray-500 rounded-lg focus:ring-red-500 focus:border-red-500"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Email"
                                className="w-full px-4 py-3 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder-gray-500 rounded-lg focus:ring-red-500 focus:border-red-500"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <TextInput
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone}
                                placeholder="Nomor Telepon"
                                className="w-full px-4 py-3 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder-gray-500 rounded-lg focus:ring-red-500 focus:border-red-500"
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <textarea
                                id="address"
                                name="address"
                                value={data.address}
                                placeholder="Alamat"
                                className="w-full px-4 py-3 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder-gray-500 rounded-lg focus:ring-red-500 focus:border-red-500"
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                rows="2"
                            />
                            <InputError
                                message={errors.address}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Password"
                                className="w-full px-4 py-3 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder-gray-500 rounded-lg focus:ring-red-500 focus:border-red-500"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                placeholder="Konfirmasi Password"
                                className="w-full px-4 py-3 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder-gray-500 rounded-lg focus:ring-red-500 focus:border-red-500"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-200 mt-6"
                            disabled={processing}
                        >
                            Daftar
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-gray-400">
                                Sudah punya akun?{" "}
                                <Link
                                    href={route("login")}
                                    className="text-yellow-500 hover:text-yellow-400 font-semibold"
                                >
                                    Masuk sini.
                                </Link>
                            </p>
                        </div>

                        <div className="text-center text-sm text-gray-500 mt-6">
                            Dengan masuk atau daftar ke platform Pustaka Abadi,
                            kamu menyetujui syarat dan ketentuan serta kebijakan
                            privasi yang berlaku.
                        </div>
                    </form>

                    <footer className="text-center text-gray-600 text-sm mt-12">
                        © Copyright Pustaka Abadi, 2026.
                    </footer>
                </div>
            </div>
        </>
    );
}
