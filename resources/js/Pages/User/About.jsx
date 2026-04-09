import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function About({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tentang Kami
                </h2>
            }
        >
            <Head title="Tentang Kami" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8">
                            {/* Header / Logo dan nama aplikasi */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-2xl mb-4">
                                    <svg
                                        className="w-12 h-12 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Pustaka Abadi
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Platform Digital untuk Membaca Buku
                                    Berkualitas
                                </p>
                            </div>

                            {/* Konten tentang aplikasi */}
                            <div className="prose prose-lg max-w-none">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Tentang Pustaka Abadi
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Pustaka Abadi adalah platform digital yang
                                    didedikasikan untuk menyediakan akses ke
                                    koleksi buku-buku berkualitas yang mencakup
                                    berbagai topik menarik seperti pengetahuan
                                    menarik, ilmu berguna, dan ide-ide yang
                                    relevan dengan kehidupan modern.
                                </p>

                                {/* Visi aplikasi */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
                                    Visi Kami
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Menjadi platform terdepan dalam menyediakan
                                    akses mudah dan terjangkau ke buku-buku
                                    berkualitas untuk semua kalangan, mendorong
                                    budaya literasi dan pembelajaran sepanjang
                                    hayat di Indonesia.
                                </p>

                                {/* Misi aplikasi */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
                                    Misi Kami
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                    <li>
                                        Menyediakan koleksi buku digital yang
                                        beragam dan berkualitas
                                    </li>
                                    <li>
                                        Memberikan pengalaman membaca yang
                                        nyaman dan mudah diakses
                                    </li>
                                    <li>
                                        Mendukung penulis dan penerbit lokal
                                    </li>
                                    <li>
                                        Membangun komunitas pembaca yang aktif
                                        dan engaged
                                    </li>
                                </ul>

                                {/* Kategori buku yang tersedia */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
                                    Kategori Buku
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Kami menyediakan berbagai kategori buku
                                    termasuk:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                    <li>
                                        Pengembangan Diri - Buku untuk
                                        meningkatkan kualitas hidup Anda
                                    </li>
                                    <li>
                                        Sains - Eksplorasi pengetahuan ilmiah
                                        terkini
                                    </li>
                                    <li>
                                        Karier - Panduan untuk pengembangan
                                        karir profesional
                                    </li>
                                    <li>
                                        Politik - Analisis mendalam tentang
                                        politik dan pemerintahan
                                    </li>
                                    <li>
                                        Biologi - Memahami kehidupan dan
                                        organisme
                                    </li>
                                    <li>Geologi - Menjelajahi planet kita</li>
                                </ul>

                                {/* Cara menghubungi */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
                                    Hubungi Kami
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Jika Anda memiliki pertanyaan, saran, atau
                                    ingin berkolaborasi dengan kami, jangan ragu
                                    untuk menghubungi tim kami melalui halaman
                                    kontak. Kami selalu senang mendengar dari
                                    pembaca kami!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
