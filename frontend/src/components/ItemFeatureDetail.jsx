// import React from "react"
// import Map from "./Map"

// const ItemFeatureDetail = ({ post }) => {
//     return (
//         <div className="mt-20 bg-gray-300 pl-10 pr-10 pt-10 pb-10">
//             <h2>{post.title}</h2>
//             <p>HUF {post.price}</p>
//             <h3>{post.condition}</h3>
//             <hr />

//             <div className="flex items-center p-4">
//                 <div className="bg-orange-300 p-4">
//                     <h3>{post.address}</h3>
//                 </div>
//             </div>
//             <hr/>
//             <h2 className="text-[20px]">About the Item</h2>
//             <p>
//                 {post.description}
//             </p>
//             <hr />

//             <section>
//                 <div>
                    
//                     <p>Available {post.createdAt}</p>
//                 </div>
//             </section>
//             <section>
//                 <Map address={post.address}/>
//             </section>
//         </div>

//     )
// }

// export default ItemFeatureDetail


import React from "react";
import Map from "./Map";

const ItemFeatureDetail = ({ post }) => {
    const dateOnly = post.createdAt.split("T")[0];

  return (
    <div className="bg-white shadow-xl rounded-lg mt-20 p-8 mx-auto max-w-4xl">
      {/* Title and Price Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-xl text-gray-700">HUF {post.price}</p>
        <h3 className="text-lg text-gray-600 mt-2">{post.condition}</h3>
      </div>

      <hr className="border-gray-200 mb-8" />

      {/* Address Section */}
      <div className="bg-orange-100 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-800">{post.address}</h3>
      </div>

      <hr className="border-gray-200 mb-8" />

      {/* About the Item Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">About the Item</h2>
        <p className="text-gray-700 mt-2">{post.description}</p>
      </div>

      <hr className="border-gray-200 mb-8" />

      {/* Availability Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Availability</h2>
        <p className="text-gray-700">Available: {dateOnly}</p>
      </section>

      <hr className="border-gray-200 mb-8" />

      {/* Map Section */}
      <section className="mb-8">
        <Map address={post.address} />
      </section>
    </div>
  );
};

export default ItemFeatureDetail;
