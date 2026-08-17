import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {FaMoon, FaSun, FaDownload, FaTimes, FaBars} from "react-icons/fa";
import { useState } from "react";
import useThemeStore from "@/store/themStore";


const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about-me", label: "About" },
  { href: "/contact", label: "Contact" },
];

const navData = {
    logo : "/logo.png",
    name : "soh",
    secondName: "takeuh"
}

export default function NavBar(){
    const {theme, toggleTheme} = useThemeStore();

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className={"h-full z-100 bg-(--bg-navbar)  border-b border-(--border-navbar) py-0 px-6 flex justify-between items-center"}>
                {/* navbar logo */}
                <div className="navbar-logo flex items-center gap-3">
                    <img className="logo h-10 lg:h-12 w-auto rounded-4xl" src={navData.logo} alt={"logo-app"}/>
                    { (navData.name !=="" || navData.secondName !=="") && (<div className="app-name flex flex-col leading-tight font-bold lg:text-lg uppercase">
                        {(navData.name !=="") && (<span className="text-(--text-primary)">{navData.name} </span>)}
                        {(navData.secondName !== "") && (<span className="text-(--text-accent)">{navData.secondName} </span>)}
                    </div>)}
                </div>

                {/* navbar links */}
                <ul className="hidden m-0 p-0 gap-6 list-none lg:flex ">
                    {navLinks.map((value, index) => (
                        <li key={index} className="">
                            <NavLink className={({isActive}) => `bg-none transition-colors duration-200 cursor-pointer pb-0.5 hover:text-(--text-accent) ${isActive ? 'font-bold text-(--text-accent) border-b-2 border-(--text-accent)' : 'font-semibold border-b-2 border-transparent text-(--text-primary)'}`} to={value.href}> {value.label} </NavLink>
                        </li>
                    ))}
                </ul>

                {/* resume download and theme toggle buttons */}
                <div className="flex items-center gap-3 ">
                    {/* toggle theme  */}
                    <Button onClick={toggleTheme} variant="outline" size="icon-lg" className={"rounded-4xl bg-(--bg-button) border-none text-(--text-accent) cursor-pointer"}> {theme === "light" ? <FaSun /> : <FaMoon/> } </Button>
                    
                    {/* download resume */}
                    <Button className={"flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer font-semibold text-sm py-4"} size={"lg"} style={{background: "linear-gradient(135deg, var(--text-accent), #1d4ed8)"}}><FaDownload/> Download Resume </Button>
                    
                    {/* hamburger button for small screens */}
                    <Button onClick={()=> setMenuOpen((prev)=> !prev)} className={"lg:hidden bg-transparent hover:bg-transparent text-(--text-primary) cursor-pointer"} size={"icon-lg"}> {menuOpen ? <FaTimes /> :<FaBars />} </Button>
                </div>
            </nav>

            {/* mobile / navigation bar for small screens */}
            {menuOpen && (
                <ul className="fixed flex flex-col text-(--text-primary) justify-center items-center gap-2 top-16 left-0 right-0 bg-(--bg-navbar) py-4 px-6 z-50 border-b border-(--border-navbar) shadow-lg lg:hidden" onClick={() => setMenuOpen(false)}>
                    {navLinks.map((value, index) => (
                        <li key={index} className="py-2 px-0 w-full text-center"> 
                            <NavLink className={({isActive}) => `block w-full py-2 transition-colors hover:text-(--text-accent) duration-200 cursor-pointer ${isActive ? 'font-bold text-(--text-accent)' : 'font-semibold'}`} to={value.href}> {value.label} </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </>

    )
}
