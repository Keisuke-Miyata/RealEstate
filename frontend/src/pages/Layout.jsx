import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
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
