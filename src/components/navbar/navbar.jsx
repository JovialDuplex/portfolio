import logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom";
import "./navbar.css"

export default function NavBar(){
    return (
        <nav className="navbar h-full px-3 flex justify-between">
            <span className="logo navbar-start">
                <img className="mask mask-circle h-14 w-auto" src={logo} alt={"logo-app"}/>
            </span>

            <ul className="navbar-center gap-2 menu menu-horizontal menu-lg">
                <li>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={"/services"}> Services </NavLink>
                </li>
                <li>
                    <NavLink to={"/projects"}> Projects </NavLink>
                </li>
                <li>
                    <NavLink to={"/about-me"}> About </NavLink>
                </li>
                <li>
                    <NavLink to={'/contact'}> Contact </NavLink>
                </li>
            </ul>

            <div className="navbar-end">
                <button className="btn btn-primary rounded-3xl"> Download Resume</button>
            </div>
        </nav>
    )
}