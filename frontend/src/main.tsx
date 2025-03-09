import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Auth0Provider
      domain="dev-zsmslfhobltorldf.us.auth0.com"
      clientId="Mxlp3hfqHHja7T9bbx8CA5vmKUpUJIHw"
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_REDIRECT_URL,
        audience: import.meta.env.VITE_AUDIENCE_URL
      }}
      // scope="openid profile email name picture username"
    >
      <StrictMode>
        <App />
      </StrictMode>
    </Auth0Provider>
  );
}