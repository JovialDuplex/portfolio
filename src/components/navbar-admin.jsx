import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import useThemeStore from "@/store/themStore";
import {FaSun, FaMoon} from "react-icons/fa6"
import { Menu } from "lucide-react";

export default function NavBarAdmin(){
    const {theme, toggleTheme} = useThemeStore();
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

    return (
        <>
            <style> {navItemsStyle} </style>
            <nav className="py-4 px-2 w-full h-full flex justify-between lg:flex-col gap-10">
                <header className="flex gap-4 justify-center items-center"> 
                    <img src={"/logo.png"} alt={"logo"} className="rounded-full h-20 w-20"/>
                </header>

                <ul className="nav text-center hidden lg:flex pt-4 flex-1  flex-col gap-10 font-semibold">
                    <li><NavLink to={"/dashboard/home"}> Dashboard </NavLink></li>
                    <li><NavLink to={"/dashboard/services"}> Services </NavLink></li>
                    <li><NavLink to={"/dashboard/projects"}> Projects </NavLink></li>
                    <li><NavLink to={"/dashboard/settings"}> settings </NavLink></li>
                </ul>

                <footer className="py-4 border-t-2 border-t-(--border-navbar) hidden lg:flex justify-between items-center gap-3">
                    <Button className={"flex-1 bg-red-500 hover:bg-red-600 cursor-pointer font-semibold "}> <LogOut/> logout </Button>
                    <Button onClick={toggleTheme} className={"cursor-pointer"} variant="ghost"> {theme==="light" ? <FaSun className="text-yellow-500"/> : <FaMoon/>} </Button>
                </footer>
            </nav>
        </>
    )
}