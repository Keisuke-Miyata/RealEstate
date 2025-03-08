import React, { FC, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser, getUser } from "../utils/api";

const Layout: FC = () => {
    const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
    const { setUserDetails } = useContext(UserDetailContext);

    const { mutate } = useMutation({
        mutationKey: [user?.email],
        mutationFn: async (token: string): Promise<void> => {
            const existingUser = await getUser(user?.email as string, token);
            console.log(`existingUser${existingUser}`);
            if (!existingUser) {
                return createUser(user?.email as string, user?.username || user?.name as string, token);
            }
        }
    });

    useEffect(() => {
        const getTokenAndRegister = async (): Promise<void> => {
            if (!user) return;

            const token = await getAccessTokenWithPopup({
                authorizationParams: {
                    audience: import.meta.env.VITE_BASE_URL,
                    scope: "openid profile email name picture username"
                }
            });

            localStorage.setItem("access_token", token ?? "");
            setUserDetails((prev) => ({ ...prev, token: token ?? null}));
            mutate(token ?? "");
        };

        if (isAuthenticated) getTokenAndRegister();

    }, [isAuthenticated]);

    useEffect(() => {
        if (user) {
            console.log("Auth0 User Object:", user);
        }
    }, [user]);

    return (
        <div>
            <Header />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
