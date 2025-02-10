import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router-dom'
import Home from "./pages/Home"
import Place from "./pages/Place"
import PlaceDetail from './pages/PlaceDetail'
import Layout from "./pages/Layout"
import Seeker from "./pages/Seeker"
import Login from "./pages/Login"
import { MantineProvider } from '@mantine/core'
import AddProperty from './pages/AddProperty'
import '@mantine/core/styles.css';
import AddTenant from './pages/AddTenant'
import Profile from "./pages/Profile"
import ItemDetail from './pages/ItemDetail'
import Items from "./pages/Items"
import Tenants from "./pages/Tenants"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import { ToastContainer } from 'react-toastify'
import { ShareProvider } from './context/ShareProvider'
import Shortlist from "./pages/Shortlist"
import ContactForm from "./pages/ContactForm"
import AddItem from "./pages/AddItem"


import { QueryClient, QueryClientProvider } from "react-query"
import UserDetailContext from './context/UserDetailContext'
import UpdateItemPage from './pages/UpdateItem'
import UpdatePropertyPage from "./pages/UpdateProperty"
import UpdateTenantPage from "./pages/UpdateTenant"

const App = () => {

  const queryClient = new QueryClient()
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    token: null
  })

  return (
    <ShareProvider>
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="/tenant" element={<AddProperty />} />
                <Route path="/place" element={<AddTenant />} />
                <Route path="/place/:id" element={<PlaceDetail />} />
                <Route path="/seeker/:id" element={<Seeker />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/places" element={<Place />} />
                <Route path="/tenants" element={<Tenants />} />
                <Route path="/items/:id" element={<ItemDetail />} />
                <Route path="/items" element={<Items />} />
                <Route path="/shortlist" element={<Shortlist />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/item" element={<AddItem />} />
                <Route path="/update/item/:id" element={<AddItem />} />
                <Route path="/update/property/:id" element={<AddProperty />} />
                <Route path="/update/tenant/:id" element={<AddTenant />} />

              </Route>

            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </MantineProvider>

      </QueryClientProvider>
    </UserDetailContext.Provider>
</ShareProvider>
  )
}

export default App