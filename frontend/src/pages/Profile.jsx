import React, { Suspense } from "react"
import { Link, Await, data } from "react-router-dom"

const Profile = () => {
    return (
        <div className="m-24">
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
                        {/* Uncomment and use actual avatar */}
                        {/* <img src={currentUser.avatar} alt="Avatar" className="w-12 h-12 rounded-full" /> */}
                        <img
                            src="https://via.placeholder.com/48"
                            alt="Avatar"
                            className="w-12 h-12 rounded-full"
                        />
                    </span>
                    <span>
                        Username: <b>Username</b>
                    </span>
                    <span>
                        Email: <b>Email</b>
                    </span>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-[150px]">
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
