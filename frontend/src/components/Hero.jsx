import React from 'react';
import { useNavigate } from "react-router-dom";
import house from "../assets/property-color-icon128.png";
import tenant from "../assets/hometenant-icon128.png";

import useAuthCheck from "../hooks/useAuthCheck"

const Hero = () => {
    const navigate = useNavigate();
    const { validateLogin } = useAuthCheck();


    return (
        <section className="max-padd-container h-[500px] md:h-[400px]">
            <div className="relative top-32">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-4">
                    {/* First Button */}
                    <div className="col-start-1 col-span-1 w-[340px]">
                        <button
                            onClick={() => validateLogin() && navigate("/tenant")}
                            className="create-button">
                            <div className='m'>
                                Offering a place to stay
                                <h4 className="bg-black text-white mt-2 py-2 text-center rounded-md">I need a tenant</h4>
                            </div>
                            <div>
                                <img src={house} alt="House" className="h-20 ml-4" />
                            </div>
                        </button>
                    </div>

                    {/* Second Button */}
                    <div className="col-start-q col-span-1 w-[340px]">
                        <button
                            onClick={() => validateLogin() && navigate("/place")}
                            className="create-button">
                            <div>
                                Looking for a place to stay
                                <h4 className="bg-black text-white mt-2 py-2 text-center rounded-md">I need a place</h4>
                            </div>
                            <div>
                                <img src={tenant} alt="House" className="h-20 ml-4" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;



