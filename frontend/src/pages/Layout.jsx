import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth0 } from "@auth0/auth0-react"
import UserDetailContext from "../context/UserDetailContext"
import { useMutation } from "react-query"
import {createUser, getUser} from "../utils/api"


const Layout = () => {


    const {isAuthenticated, user, getAccessTokenWithPopup} = useAuth0()
    const {setUserDetails} = useContext(UserDetailContext)
    const {mutate} = useMutation({
        mutationKey: [user?.email],
        mutationFn: async (token)=> {

            const existingUser = await getUser(user?.email, token);
            console.log(`existingUser${existingUser}`)
            if (!existingUser){
                return createUser(user?.email, user?.username || user?.name, token)
            }
        }
    })

    useEffect(()=> {
        const getTokenAndRegister = async () => {
            if (!user) return;

            const token = await getAccessTokenWithPopup({
                authorizationParams: {
                    audience: "http://localhost:3000",
                    scope: "openid profile email name picture username"
                }
            })
            console.log(token)

        localStorage.setItem("access_token", token)
        setUserDetails((prev) => ({...prev, token}))
        mutate(token)
    }
        isAuthenticated && getTokenAndRegister()

}, [isAuthenticated])

useEffect(() => {
    if (user) {
        console.log("Auth0 User Object:", user);
    }
}, [user]);


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
