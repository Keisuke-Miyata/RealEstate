import React, { FC } from 'react';
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../../hooks/useAuthCheck";

const Hero: FC = () => {
    const navigate: (path: string) => void = useNavigate();
    const { validateLogin }: { validateLogin: () => boolean } = useAuthCheck();

    return (
        <section className="max-padd-container h-[500px] md:h-[400px]">
            <div className="relative top-32">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-4">
                    {/* First Button */}
                    <div className="col-start-1 col-span-1 w-[340px]">
                        <button
                            onClick={() => validateLogin() && navigate("/add/property")}
                            className="create-button">
                            <div className='m'>
                                Offering a place to stay
                                <h4 className="bg-black text-white mt-2 py-2 text-center rounded-md">I need a tenant</h4>
                            </div>
                            <div>
                                <img src="/assets/property-color-icon128.png" alt="House" className="h-20 ml-4" />
                            </div>
                        </button>
                    </div>

                    {/* Second Button */}
                    <div className="col-start-q col-span-1 w-[340px]">
                        <button
                            onClick={() => validateLogin() && navigate("/add/tenant")}
                            className="create-button">
                            <div>
                                Looking for a place to stay
                                <h4 className="bg-black text-white mt-2 py-2 text-center rounded-md">I need a place</h4>
                            </div>
                            <div>
                                <img src="/assets/hometenant-icon128.png" alt="Tenant" className="h-20 ml-4" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;