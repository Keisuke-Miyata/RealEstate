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
import Item from "./pages/Item"
import Tenants from "./pages/Tenants"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"


import { QueryClient, QueryClientProvider } from "react-query"
import UserDetailContext from './context/UserDetailContext'

const App = () => {

  const queryClient = new QueryClient()
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    token: null
  })

  return (
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
                {/* <Route path="/profile/update" /> */}
                <Route path="/item/:id" element={<ItemDetail />} />
                <Route path="/item" element={<Item />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </UserDetailContext.Provider>

  )
}

export default App