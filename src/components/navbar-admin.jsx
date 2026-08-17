import { NavLink } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import useThemeStore from "@/store/themStore";
import { FaSun, FaMoon } from "react-icons/fa6";
import useUser from "@/hooks/user";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function NavBarAdmin() {
    const { theme, toggleTheme } = useThemeStore();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItemsStyle = `
        .nav li {
            border-radius: 5px;
            padding: 0.75rem 0.5rem;
        }
        li:has(a.active) {
            color: white;
            background: var(--text-accent);
        }
    `;

    const { logout } = useUser();

    return (
        <>
            <style> {navItemsStyle} </style>

            {/* Mobile Navigation Header with Shadcn Sheet Sidebar (< lg) */}
            <div className="lg:hidden flex items-center justify-between p-3 border-b border-(--border-navbar) bg-(--bg-navbar)">
                <div className="flex items-center gap-3">
                    <img src={"/logo.png"} alt={"logo"} className="rounded-full h-9 w-9" />
                    <span className="font-bold text-lg uppercase tracking-wide text-(--text-primary)">Admin</span>
                </div>

                <div className="flex items-center gap-2">
                    <Button onClick={toggleTheme} size="icon" variant="ghost" className="cursor-pointer">
                        {theme === "light" ? <FaSun className="text-yellow-500" /> : <FaMoon />}
                    </Button>

                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="ghost" className="cursor-pointer">
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="[background:var(--bg-page)] text-(--text-primary) border-r border-(--border-navbar) w-72 flex flex-col justify-between p-6 z-50">
                            <div className="flex flex-col gap-6">
                                <SheetHeader className="flex flex-row items-center gap-3 border-b border-(--border-navbar) pb-4 text-left p-0">
                                    <img src={"/logo.png"} alt={"logo"} className="rounded-full h-12 w-12" />
                                    <div>
                                        <SheetTitle className="text-lg font-bold text-(--text-primary) uppercase">Admin Panel</SheetTitle>
                                        <p className="text-xs text-(--text-secondary)">Navigation & Control</p>
                                    </div>
                                </SheetHeader>

                                <ul className="nav flex flex-col gap-3 font-semibold text-center mt-2" onClick={() => setMobileOpen(false)}>
                                    <li><NavLink to={"/admin/dashboard/home"}> Dashboard </NavLink></li>
                                    <li><NavLink to={"/admin/dashboard/services"}> Services </NavLink></li>
                                    <li><NavLink to={"/admin/dashboard/projects"}> Projects </NavLink></li>
                                    <li><NavLink to={"/admin/dashboard/settings"}> Settings </NavLink></li>
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-(--border-navbar) flex flex-col gap-3">
                                <Button className="w-full bg-red-500 hover:bg-red-600 cursor-pointer font-semibold" onClick={logout}>
                                    <LogOut size={18} className="mr-2" /> Logout
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Desktop Navigation (>= lg) */}
            <nav className="py-4 px-2 w-full h-full hidden lg:flex lg:justify-between lg:flex-col gap-10">
                <header className="flex gap-4 justify-center items-center">
                    <img src={"/logo.png"} alt={"logo"} className="rounded-full h-20 w-20" />
                </header>

                <ul className="nav text-center hidden lg:flex pt-4 flex-1 flex-col gap-6 font-semibold">
                    <li><NavLink to={"/admin/dashboard/home"}> Dashboard </NavLink></li>
                    <li><NavLink to={"/admin/dashboard/services"}> Services </NavLink></li>
                    <li><NavLink to={"/admin/dashboard/projects"}> Projects </NavLink></li>
                    <li><NavLink to={"/admin/dashboard/settings"}> Settings </NavLink></li>
                </ul>

                <footer className="py-4 border-t-2 border-t-(--border-navbar) hidden lg:flex justify-between items-center gap-3">
                    <Button className={"flex-1 bg-red-500 hover:bg-red-600 cursor-pointer font-semibold "} onClick={logout}> <LogOut /> logout </Button>
                    <Button onClick={toggleTheme} className={"cursor-pointer"} variant="ghost"> {theme === "light" ? <FaSun className="text-yellow-500" /> : <FaMoon />} </Button>
                </footer>
            </nav>
        </>
    )
}