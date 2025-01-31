import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({containerStyles}) => {
    return (
        <nav className={`${containerStyles}`}>
        {/* // <nav> */}
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}>
                Home
            </NavLink>
            <NavLink to="/places" className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}>
                Property
            </NavLink>
            <NavLink to="/tenants" className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}>
                Tenant
            </NavLink>
            <NavLink to="/items" className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}>
                Items
            </NavLink>
            <NavLink to="/shortlist" className={({ isActive }) => isActive ? "active-link py-1" : "py-1"}>
                Shortlist
            </NavLink>
        </nav>
    )
}

export default Navbar