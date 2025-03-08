import React, { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => {
    return (
        <footer className="bg-black text-white flex flex-col md:flex-row gap-4 mx-auto max-w-[1440px] px-16 py-4">
            <div className="md:w-1/2 w-full p-4 md:pb-36 md:pt-10">
                <p>
                    This is a peer-to-peer listing platform for those looking for apartments, shared flats, or those looking for a flatmate.
                </p>
            </div>
            <div className="md:w-1/2 w-full p-4 md:p-10">
                <Link to="/contact">
                    <p className="hover:text-blue-500">Contact us</p>
                </Link>
            </div>
        </footer>
    );
}

export default Footer;