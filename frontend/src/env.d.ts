/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REDIRECT_URL: string;
    readonly VITE_API_URL: string;
    readonly VITE_AUDIENCE_URL: string;
    readonly VITE_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    readonly VITE_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
