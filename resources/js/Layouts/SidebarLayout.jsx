import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function SidebarLayout({ user, children }) {
    const { url } = usePage();
    const [showLogoutMenu, setShowLogoutMenu] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Cek lagi menu yang lg aktif
    const isActive = (path) => {
        return url.startsWith(path);
    };

    // Load status sidebar dari localStorage pas awal dibuka
    useEffect(() => {
        const saved = localStorage.getItem("sidebar_collapsed");
        if (saved === "true") {
            setIsCollapsed(true);
        }

        // Biar bisa toggle sidebar pake Ctrl+B
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "b") {
                e.preventDefault();
                toggleSidebar();
            }
        };

        // Biar bisa trigger toggle dari component lain juga
        const handleToggle = () => {
            setIsCollapsed((prev) => {
                const newState = !prev;
                localStorage.setItem("sidebar_collapsed", newState.toString());
                return newState;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("toggle-sidebar", handleToggle);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("toggle-sidebar", handleToggle);
        };
    }, []);

    // Toggle sidebar beserta saving ke localStorage
    const toggleSidebar = () => {
        setIsCollapsed((prev) => {
            const newState = !prev;
            localStorage.setItem("sidebar_collapsed", newState.toString());
            return newState;
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`bg-white border-r border-gray-200 flex flex-col fixed h-full transition-all duration-300 ${
                    isCollapsed ? "w-10" : "w-64"
                }`}
            >
                {/* Logo */}
                <div
                    className={`p-4 border-b border-gray-200 ${isCollapsed ? "px-2" : ""}`}
                >
                    <Link
                        href={route("dashboard")}
                        className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
                    >
                        <div className="w-9 h-10 bg-white-900 flex items-center justify-center rounded-lg flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>

                        </div>
                        {!isCollapsed && (
                            <div>
                                <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    Pustaka
                                </div>
                                <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    Abadi
                                </div>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Menu */}
                <nav className={`flex-1 p-4 ${isCollapsed ? "px-2" : ""}`}>
                    {!isCollapsed && (
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Menu
                        </p>
                    )}
                    <div
                        className={`space-y-1 ${isCollapsed ? "flex flex-col items-center" : ""}`}
                    >
                        <Link
                            href={route("dashboard")}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition relative group ${
                                isCollapsed ? "justify-center" : ""
                            } ${
                                isActive("/dashboard") && url === "/dashboard"
                                    ? "bg-gray-100 text-gray-900 font-medium"
                                    : "text-gray-700 hover:bg-gray-50"
                            }`}
                            title="Home"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                class="size-6"
                                >
                            <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" 
                                />
                            </svg>
                            {!isCollapsed && <span>Home</span>}
                        </Link>

                        <Link
                            href={route("books.index")}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition relative group ${
                                isCollapsed ? "justify-center" : ""
                            } ${
                                isActive("/books")
                                    ? "bg-gray-100 text-gray-900 font-medium"
                                    : "text-gray-700 hover:bg-gray-50"
                            }`}
                            title="Explore"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                class="size-6"
                                >
                            <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                                />
                            </svg>
                                                            {!isCollapsed && <span>Explore</span>}
                        </Link>

                        <Link
                            href={route("orders.index")}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition relative group ${
                                isCollapsed ? "justify-center" : ""
                            } ${
                                isActive("/orders")
                                    ? "bg-gray-100 text-gray-900 font-medium"
                                    : "text-gray-700 hover:bg-gray-50"
                            }`}
                            title="Pesanan"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                class="size-6"
                                >
                            <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
                                />
                            </svg>
                            {!isCollapsed && <span>Pesanan</span>}
                        </Link>
                    </div>
                </nav>

                {/* User Profile */}
                <div
                    className={`p-4 border-t border-gray-200 ${isCollapsed ? "px-2" : ""}`}
                >
                    <div className="relative">
                        <button
                            onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition ${
                                isCollapsed ? "justify-center" : ""
                            }`}
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            {!isCollapsed && (
                                <>
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            User
                                        </p>
                                    </div>
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </>
                            )}
                        </button>

                        {/* Dropdown menu waktu logout */}
                        {showLogoutMenu && !isCollapsed && (
                            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                                <div className="p-2 border-b border-gray-100">
                                    <p className="text-xs text-gray-500 px-3 py-1">
                                        {user.email}
                                    </p>
                                </div>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    Log out
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"}`}
            >
                {children}
            </main>
        </div>
    );
}
