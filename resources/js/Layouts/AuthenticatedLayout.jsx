import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const isAdmin = user.role === "admin";

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link
                                    href={
                                        isAdmin
                                            ? route("admin.dashboard")
                                            : route("dashboard")
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-900 flex items-center justify-center rounded-lg">
                                            <svg
                                                className="w-8 h-8 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                                Pustaka
                                            </div>
                                            <div className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                                Abadi
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {isAdmin ? (
                                    <>
                                        <NavLink
                                            href={route("admin.dashboard")}
                                            active={route().current(
                                                "admin.dashboard",
                                            )}
                                        >
                                            Dashboard
                                        </NavLink>
                                        <NavLink
                                            href={route(
                                                "admin.categories.index",
                                            )}
                                            active={route().current(
                                                "admin.categories.*",
                                            )}
                                        >
                                            Kategori
                                        </NavLink>
                                        <NavLink
                                            href={route("admin.books.index")}
                                            active={route().current(
                                                "admin.books.*",
                                            )}
                                        >
                                            Buku
                                        </NavLink>
                                        <NavLink
                                            href={route("admin.orders.index")}
                                            active={route().current(
                                                "admin.orders.*",
                                            )}
                                        >
                                            Pesanan
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink
                                            href={route("dashboard")}
                                            active={route().current(
                                                "dashboard",
                                            )}
                                        >
                                            Dashboard
                                        </NavLink>
                                        <NavLink
                                            href={route("books.index")}
                                            active={route().current("books.*")}
                                        >
                                            Buku
                                        </NavLink>
                                        <NavLink
                                            href={route("cart.index")}
                                            active={route().current("cart.*")}
                                        >
                                            Keranjang
                                        </NavLink>
                                        <NavLink
                                            href={route("orders.index")}
                                            active={route().current("orders.*")}
                                        >
                                            Pesanan Saya
                                        </NavLink>
                                        <NavLink
                                            href={route("contact.index")}
                                            active={route().current(
                                                "contact.*",
                                            )}
                                        >
                                            Kontak
                                        </NavLink>
                                        <NavLink
                                            href={route("about")}
                                            active={route().current("about")}
                                        >
                                            Tentang
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}
                                                {isAdmin && (
                                                    <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                                                        Admin
                                                    </span>
                                                )}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        {isAdmin ? (
                            <>
                                <ResponsiveNavLink
                                    href={route("admin.dashboard")}
                                    active={route().current("admin.dashboard")}
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("admin.categories.index")}
                                    active={route().current(
                                        "admin.categories.*",
                                    )}
                                >
                                    Kategori
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("admin.books.index")}
                                    active={route().current("admin.books.*")}
                                >
                                    Buku
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("admin.orders.index")}
                                    active={route().current("admin.orders.*")}
                                >
                                    Pesanan
                                </ResponsiveNavLink>
                            </>
                        ) : (
                            <>
                                <ResponsiveNavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("books.index")}
                                    active={route().current("books.*")}
                                >
                                    Buku
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("cart.index")}
                                    active={route().current("cart.*")}
                                >
                                    Keranjang
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("orders.index")}
                                    active={route().current("orders.*")}
                                >
                                    Pesanan Saya
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("contact.index")}
                                    active={route().current("contact.*")}
                                >
                                    Kontak
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("about")}
                                    active={route().current("about")}
                                >
                                    Tentang
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
