import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    // Form login - email sama password
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // Clear password waktu component dihapus dari DOM
    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    // Submit form login ke server
    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Masuk" />

            <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] relative overflow-hidden">
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
                            Masuk menggunakan email
                        </h1>
                    </div>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-400 text-center">
                            {status}
                        </div>
                    )}

                    {/* Form login */}
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Email"
                                className="w-full px-4 py-3 bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder-gray-500 rounded-lg focus:ring-red-500 focus:border-red-500"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
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
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Checkbox remember me - biar nggak perlu login terus */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="rounded bg-[#2a2a2a] border-[#3a3a3a] text-red-600 focus:ring-red-500"
                            />
                            <span className="ms-2 text-sm text-gray-400">
                                Ingat saya
                            </span>
                        </div>

                        <button
                            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-200"
                            disabled={processing}
                        >
                            Masuk
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-gray-400">
                                Belum punya akun?{" "}
                                <Link
                                    href={route("register")}
                                    className="text-yellow-500 hover:text-yellow-400 font-semibold"
                                >
                                    Daftar di sini.
                                </Link>
                            </p>
                        </div>
                        
                        <div className="text-center text-sm text-gray-500 mt-8">
                            Dengan masuk atau daftar ke platform Pustaka Abadi,
                            kamu menyetujui syarat dan ketentuan serta kebijakan
                            privasi yang berlaku.
                        </div>
                    </form>

                    <footer className="text-center text-gray-600 text-sm mt-16">
                        © Copyright Pustaka Abadi, 2026.
                    </footer>
                </div>
            </div>
        </>
    );
}
