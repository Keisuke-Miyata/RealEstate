import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
    containerStyles: string;
}

const Navbar: FC<NavbarProps> = ({ containerStyles }) => {
    return (
        <nav className={`${containerStyles}`}>
            <NavLink to="/" className={({ isActive }: { isActive: boolean }) => isActive ? "active-link py-1" : "py-1"}>
                Home
            </NavLink>
            <NavLink to="/property" className={({ isActive }: { isActive: boolean }) => isActive ? "active-link py-1" : "py-1"}>
                Property
            </NavLink>
            <NavLink to="/tenant" className={({ isActive }: { isActive: boolean }) => isActive ? "active-link py-1" : "py-1"}>
                Tenant
            </NavLink>
            <NavLink to="/item" className={({ isActive }: { isActive: boolean }) => isActive ? "active-link py-1" : "py-1"}>
                Items
            </NavLink>
            <NavLink to="/shortlist" className={({ isActive }: { isActive: boolean }) => isActive ? "active-link py-1" : "py-1"}>
                Shortlist
            </NavLink>
        </nav>
    );
}

export default Navbar;