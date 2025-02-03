import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react"

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-zsmslfhobltorldf.us.auth0.com"
    clientId="Mxlp3hfqHHja7T9bbx8CA5vmKUpUJIHw"
    authorizationParams={{
      redirect_uri: "http://localhost:5173"
    }}
    audience="http://localhost:3000"
    scope="openid profile email name picture username"
    >
      <StrictMode>
          <App />
      </StrictMode>
  </Auth0Provider>
)
