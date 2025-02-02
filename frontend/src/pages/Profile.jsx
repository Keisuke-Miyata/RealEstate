import React, { Suspense, useState, useEffect, useContext } from "react"
import { Link, Await, data } from "react-router-dom"
import { Avatar, Menu } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import UserDetailContext from "../context/UserDetailContext"
import { getAllFav } from "../utils/api"
import SavedList from "../components/SavedList"
import ProfileMyList from "../components/ProfileMyList"

const Profile = () => {

    const { user, logout, getAccessTokenSilently } = useAuth0()
    const { token } = useContext(UserDetailContext)
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        console.log(user);  // Log the user object
      }, [user]);
      

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = await getAccessTokenSilently();
                if (user?.email) {
                    const favs = await getAllFav(user.email, token);
                    setFavorites(favs);
                }
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
    
        if (user) {
            fetchFavorites();
        }
    }, [user, getAccessTokenSilently]);
    



    return (
        <div className="card-detail">
            {/* User Information Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">User Information</h1>
                    <Link to="/profile/update">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                            Update Profile
                        </button>
                    </Link>
                </div>
                <hr className="mb-4 border-black" />
                {/* User Details */}
                <div className="flex flex-col gap-4">
                    <span className="flex items-center gap-2">
                        Avatar:
                        <img src={user.picture} alt="avatar" className="w-12 h-12 rounded-full" />
                    </span>
                    <span>
                        Username: <b>{user.name}</b>
                    </span>
                    <span>
                        Email: <b>{user.email}</b>
                    </span>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-[150px]" 
                        onClick={()=>{
                            localStorage.clear()
                            logout()
                    }}>
                        Logout
                    </button>
                </div>
            </div>

            {/* My List Section */}
            <div className="mt-12">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">My List</h1>
                    <Link to="/add">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                            Create New Post
                        </button>
                    </Link>
                </div>
                <hr className="mb-4 border-black"  />
                <ProfileMyList userEmail={user?.email}/>
                {/* Uncomment below for Suspense List */}
                {/* <Suspense fallback={<p>Loading...</p>}>
                    <Await
                        resolve={data.postResponse}
                        errorElement={<p>Error loading posts!</p>}
                    >
                        {(postResponse) => <List posts={postResponse.data.userPosts} />}
                    </Await>
                </Suspense> */}
            </div>

            {/* Saved List Section */}
            <div className="mt-12">
                <h1 className="text-xl font-bold mb-4">Saved List</h1>
                <hr className="mb-4 border-black"  />

                <SavedList />
                {console.log(favorites)}

                {/* Uncomment below for Suspense List */}
                {/* <Suspense fallback={<p>Loading...</p>}>
                    <Await
                        resolve={data.postResponse}
                        errorElement={<p>Error loading posts!</p>}
                    >
                        {(postResponse) => <List posts={postResponse.data.savedPosts} />}
                    </Await>
                </Suspense> */}
            </div>
        </div>
    )
}

export default Profile
