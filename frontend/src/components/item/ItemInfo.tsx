import React, { FC } from "react";
import Map from "../common/Map";

interface Post {
  createdAt: string;
  title: string;
  price: number;
  condition: string;
  address: string;
  description: string;
}

interface ItemFeatureDetailProps {
  post: Post;
}

const ItemInfo: FC<ItemFeatureDetailProps> = ({ post }) => {
    const dateOnly: string = post.createdAt.split("T")[0];

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

export default ItemInfo;