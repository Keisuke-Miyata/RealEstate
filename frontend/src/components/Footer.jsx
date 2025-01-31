import React from "react"
import { Link } from "react-router"

const Footer = () => {
    return (
        <footer className="bg-black text-white h-[300px] flex gap-4 w-[100%]">
            <div className="w-1/2 p-10">
                <p>This is a peer to peer listing platform for those looking for apartments, shared flats or those looking for a flatmate.</p>
            </div>
            <div className="w-1/2 p-10">
            <Link to="/contact">
                <p>Contact us</p>
            </Link>
            </div>
        </footer>
    )
}

export default Footer