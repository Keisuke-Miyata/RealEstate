import React, { FC } from 'react';
import Hero from "../components/homepage/Hero";
import Listing from "../components/homepage/Listing";

const Home: FC = () => {
    return (
        <div className='mx-auto max-w-[1440px]'>
            <Hero />
            <Listing />
        </div>
    );
}

export default Home;