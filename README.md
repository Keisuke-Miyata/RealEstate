# Facilitating Accommodation and Flatmate Searches: Peer-to-Peer Listing Platform

## Description

This project is a web-based platform aimed at facilitating accommodation and flatmate searches, with an integrated sale of items. It provides an easy-to-use interface for users to search for available rooms or apartments, find flatmates, and sell or give items with others in their community.

The platform is designed to support:

- Accommodation search
- Flatmate search
- Item sale
- Easy-to-use UI for listing and browsing items

## Features

- **Accommodation Listings**: Post and browse available rooms and apartments.
- **Flatmate Search**: Find or offer flatmate opportunities based on your preferences.
- **Item Sale**: List and browse items available for sale.
- **User Profiles**: Create and manage user profiles with preferences and personal details.
- **Authentication**: Secure user authentication using Auth0.

## Technologies Used

- **Frontend**: React, Vite, CSS (Tailwind CSS), HTML
- **Backend**: Nodejs, Express.js
- **Database**: MongoDB
- **Authentication**: Auth0
- **Deployment**: Vercel, Render

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/real-estate-project.git
2. Navigate to the project directory:
    ```bash
    cd real-estate-project

3. Install the dependencies:
   - For the frontend
     ```bash
     cd frontend
     npm install

  - For the backend
    ```bash
    cd backend
    npm install
4. Setup .env file:
   - Frontend:
     ```bash
     VITE_API_URL="http://localhost:3000/api"
     VITE_REDIRECT_URL="http://localhost:5173"
     VITE_AUDIENCE_URL="http://localhost:3000"
     VITE_PUBLIC_CLOUDINARY_CLOUD_NAME
     VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET
     VITE_BASE_URL="http://localhost:3000/"
   - Backend:
     ```bash
     PORT = 3000
     MONGO_URL
     GMAIL_PASSWORD
     GMAIL_ADDRESS
     AUDIENCE_URL="http://localhost:3000"
     ISSUER_BASE_URL= your auth0 url
     FRONTEND="http://localhost:5173"

6. Start the development servers:
   - Frontend:
     ```bash
     npm run dev
   - Backend:
     ```bash
     nodemon index.js
7. Visit the app in your browser at http://localhost:5173.

## Usage
User Registration and Login: Users can log in using their credentials.

Listing and Browsing: Users can create listings for accommodation or items and browse existing listings.

## Contributing
We welcome contributions to improve the project! If you have suggestions, bug fixes, or new features to add, feel free to fork the repository and submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes.
4. Push your branch to your forked repository.
5. Submit a pull request.
