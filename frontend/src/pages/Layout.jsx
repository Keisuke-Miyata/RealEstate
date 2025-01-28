import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth0 } from "@auth0/auth0-react"
import UserDetailContext from "../context/UserDetailContext"
import { useMutation } from "react-query"
import {createUser} from "../utils/api"


const Layout = () => {


    const {isAuthenticated, user, getAccessTokenWithPopup} = useAuth0()
    const {setUserDetails} = useContext(UserDetailContext)
    const {mutate} = useMutation({
        mutationKey: [user?.email],
        mutationFn: (token)=> createUser(user?.email, token)
    })

    useEffect(()=> {
        const getTokenAndRegister = async () => {
            const res = await getAccessTokenWithPopup({
                authorizationParams: {
                    audience: "http://localhost:3000",
                    scope: "openid profile email"
                }
            })
        
        localStorage.setItem("access_token", res)
        setUserDetails((prev) => ({...prev, token: res}))
        mutate(res)
    }
        isAuthenticated && getTokenAndRegister()
    
}, [isAuthenticated])

    return (
        <div>
            <Header />
            <main className="min-h-screen">
                <Outlet /> {/* This will render the content of each page */}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
