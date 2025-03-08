import React, { FC, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import PropertyList from "./pages/property/PropertyList";
import PropertyDetail from './pages/property/PropertyDetail';
import Layout from "./pages/Layout";
import TenantDetail from "./pages/tenants/TenantDetail";
import Login from "./pages/auth/Login";
import { MantineProvider } from '@mantine/core';
import AddProperty from './pages/property/AddProperty';
import '@mantine/core/styles.css';
import AddTenant from './pages/tenants/AddTenant';
import Profile from "./pages/Profile";
import ItemDetail from './pages/items/ItemDetail';
import ItemList from "./pages/items/ItemList";
import TenantList from "./pages/tenants/TenantList";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ToastContainer } from 'react-toastify';
import { ShareProvider } from './context/ShareProvider';
import Shortlist from "./pages/Shortlist";
import ContactForm from "./pages/ContactForm";
import AddItem from "./pages/items/AddItem";

import { QueryClient, QueryClientProvider } from "react-query";
import UserDetailContext, { UserDetail } from './context/UserDetailContext';
import ScrollToTop from "./components/navigation/ScrollToTop";

const App: FC = () => {
  const queryClient: QueryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState<UserDetail>({
    favourites: [],
    token: null
  });

  return (
    <ShareProvider>
      <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            <BrowserRouter>
              <ScrollToTop />
              <AppRoutes />
            </BrowserRouter>
            <ToastContainer />
          </MantineProvider>
        </QueryClientProvider>
      </UserDetailContext.Provider>
    </ShareProvider>
  );
};

const AppRoutes: FC = () => (
  <Routes>
    <Route path="/" element={<Layout />} >
      <Route index element={<Home />} />

      {/* Add Routes */}
      <Route path="/add/property" element={<AddProperty />} />
      <Route path="/add/tenant" element={<AddTenant />} />
      <Route path="/add/item" element={<AddItem />} />

      {/* Edit Routes */}
      <Route path="/update/property/:id" element={<AddProperty />} />
      <Route path="/update/tenant/:id" element={<AddTenant />} />
      <Route path="/update/item/:id" element={<AddItem />} />

      <Route path="/property/:id" element={<PropertyDetail />} />
      <Route path="/tenant/:id" element={<TenantDetail />} />
      <Route path="/item/:id" element={<ItemDetail />} />

      <Route path="/property" element={<PropertyList />} />
      <Route path="/tenant" element={<TenantList />} />
      <Route path="/item" element={<ItemList />} />

      <Route path="/shortlist" element={<Shortlist />} />
      <Route path="/contact" element={<ContactForm />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />

    </Route>
  </Routes>
);

export default App;