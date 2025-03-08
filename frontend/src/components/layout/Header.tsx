import React, { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { MdMenu, MdClose } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "./ProfileMenu";

const Header: FC = () => {
    const [active, setActive] = useState<boolean>(false);
    const [menuOpened, setMenuOpened] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setMenuOpened((prev: boolean) => !prev);
    };

    useEffect((): (() => void) => {
        const handleScroll = (): void => {
            if (window.scrollY > 0) {
                if (menuOpened) {
                    setMenuOpened(false);
                }
            }
            setActive(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return (): void => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [menuOpened]);

    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

    return (
        <header className={`${active ? "py-1 bg-white shadow-md" : "py-2"} max-pad-container fixed top-0 w-full left-0 right-0 z-50 transition-all duration-200`}>
            {/* Container */}
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center justify-center gap-x-19">
                    <Link to="/">
                        <img src="/assets/house-color-icon128.png" alt='Logo' className='h-16' />
                    </Link>
                </div>
                {/* Navbar */}
                <div className='flex items-center justify-center gap-x-4'>
                    {/* Desktop */}
                    {/* <Navbar /> */}
                    <Navbar containerStyles={"hidden xl:flex gap-x-5 xl:gap-x-12 capitalize medium-15"} />
                    {/* Mobile */}
                    <Navbar containerStyles={`${menuOpened ? "flex items-start flex-col gap-y-8 capitalize fixed top-20 right-8 p-12 bg-white shadow-md rounded-2xl w-64 medium-15 ring-1 ring-slate-900/20 transition-all duration-1000 z-50" : "flex items-start flex-col gap-y-8 capitalize fixed top-20 -right-[100%] p-12 bg-white shadow-md rounded-2xl w-64 medium-15 ring-1 ring-slate-900/20 transition-all duration-300"}`} />
                </div>
                {/* Button */}
                <div className='flex items-center justify-between gap-x-3 sm:gap-x-5 bold-16'>
                    {!menuOpened ? (
                        <MdMenu onClick={toggleMenu} className='xl:hidden cursor-pointer text-xl' />
                    ) : (
                        <MdClose onClick={toggleMenu} className='xl:hidden cursor-pointer text-xl' />
                    )}
                    {!isAuthenticated ?
                        <button className='flex items-center justify-center gap-x-2 !px-5 btn-dark' onClick={()=> loginWithRedirect()}>
                            <LuUserRound className="text-xl" />
                            <span>Log In</span>
                        </button> :
                        <ProfileMenu user={user} logout={logout} />}
                </div>
            </div>
        </header>
    );
};

export default Header;