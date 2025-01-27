import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({containerStyles}) => {
    return (
        <nav className={`${containerStyles}`}>
        {/* // <nav> */}
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}>
                Home
            </NavLink>
            <NavLink to="/shortlist" className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}>
                Shortlist
            </NavLink>
            <NavLink to="/message" className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}>
                Messages
            </NavLink>
            <NavLink to="Items" className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}>
                Items
            </NavLink>
            <NavLink to="/signIn" className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}>
                Sign in
            </NavLink>
        </nav>
    )
}

export default Navbar