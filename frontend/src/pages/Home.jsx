import React from 'react'
import Hero from "../components/Hero"
import Listing from "../components/Listing"

const Home = () => {
    return (
        <div className='mx-auto max-w-[1440px]'>
            <Hero />
            <Listing />
        </div>
    )
}

export default Home