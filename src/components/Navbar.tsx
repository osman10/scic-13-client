"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { FaCompass } from "react-icons/fa6";
import LogoutButton from "./LogoutButton";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";





const menuItems = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
];
const loginMenuItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Host", href: "/host" },
    { label: "My Listing", href: "/my-listing" },
]


const Navbar = () => {
     const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 
    // user name and image 
    const imageUrl = session?.user.image;
    const userName = session?.user.name;




    const pathname = usePathname();

    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${scrolled
                    ? "bg-white/40 backdrop-blur-md border-b border-gray-200 shadow-sm"
                    : "bg-transparent"
                }`}
        >
            <nav className="relative flex items-center justify-between px-6 py-5 bg-white/40">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="rounded-full p-1 text-3xl text-[var(--accent)]">
                        <FaCompass className="text-lg text-orange-500" />
                    </div>

                    <span
                        className={`font-libertinus text-2xl font-extrabold text-[var(--card-foreground)] 
                            }`}
                    >
                        Traveller
                    </span>
                </Link>

                {/* Desktop Menu */}
                <ul
                    className={`hidden md:flex items-center gap-8 text-[var(--card-foreground)] 
                        }`}
                >
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`transition-colors duration-300 hover:text-[var(--accent)] ${pathname === item.href ? "text-[var(--accent)]" : ""
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    {session &&
                        loginMenuItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`transition-colors duration-300 hover:text-[var(--accent)] ${pathname === item.href ? "text-[var(--accent)]" : ""
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                </ul>



                {/* Desktop auth section */}
                <div className="hidden md:flex">
                    <ul>
                        {session ?
                            <li className="w-full">
                                <div className="flex items-center justify-center gap-4 px-6 mt-4">
                                   <Image src={`${imageUrl}`} alt={`${userName}`} height={40} width={40} className="rounded-full border border-gray-500"/>
                                   <LogoutButton/>
                                </div>
                            </li>

                            :

                            <li className="w-full">
                                <div className="flex items-center justify-center gap-4 px-6 mt-4">
                                    <Link
                                        href="/register"
                                        className="flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-4 py-1 font-semibold text-white transition-all duration-300 hover:bg-green-00 hover:shadow-lg active:scale-95"
                                    >
                                        Register
                                    </Link>

                                    <Link
                                        href="/login"
                                        className={`flex w-full items-center justify-center rounded-full px-4 py-1 font-semibold transition-all duration-300 active:scale-95 ${scrolled
                                            ? "border border-gray-700 bg-gray-700 text-white hover:border-gray-700 hover:bg-white hover:text-gray-700"
                                            : "border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white hover:shadow-lg"
                                            }`}
                                    >
                                        Login
                                    </Link>
                                </div>
                            </li>
                        }
                    </ul>
                </div>







                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`text-3xl md:hidden ${scrolled ? "text-[var(--card-foreground)]" : "text-white"
                        }`}
                >
                    {isMenuOpen ? <IoMdClose /> : <CgMenuRight />}
                </button>


                {/* Mobile Menu */}
                <ul
                    className={`absolute top-full left-0 flex min-h-[80vh] w-full flex-col bg-black/80 backdrop-blur-sm transition-all duration-300 md:hidden ${isMenuOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0 pointer-events-none"
                        }`}
                >
                    {menuItems.map((item) => (
                        <li key={item.href} className="border-b border-gray-700/50">
                            <Link
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block w-full px-6 py-4 text-center transition-all duration-300 hover:bg-white/10 hover:text-[var(--accent)] active:scale-95 active:bg-white/20 ${pathname === item.href
                                    ? "text-[var(--accent)]"
                                    : "text-white"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}

                    {session &&
                        loginMenuItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`transition-colors duration-300 hover:text-[var(--accent)] ${pathname === item.href ? "text-[var(--accent)]" : ""
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                    {session ?
                        <li className="w-full">
                            <div className="flex items-center justify-center gap-4 px-6 mt-4">
                                <LogoutButton/>
                            </div>
                        </li>

                        :

                        <li className="w-full">
                            <div className="flex items-center justify-center gap-4 px-6 mt-4">
                                <Link
                                    href="/register"
                                    className="flex w-full items-center justify-center rounded-lg bg-green-500 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-green-600 hover:shadow-lg active:scale-95"
                                >
                                    Register
                                </Link>

                                <Link
                                    href="/login"
                                    className="flex w-full items-center justify-center rounded-lg border border-white/40 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg active:scale-95"
                                >
                                    Login
                                </Link>
                            </div>
                        </li>
                    }




                </ul>
            </nav>
        </header>
    );
};

export default Navbar;