import React from "react";
import { FaMoneyBill, FaCheck } from "react-icons/fa";
import { LuClock4 } from "react-icons/lu";
import { FaTruck } from "react-icons/fa6";

const SeekerDetails = ({ post }) => {
  const dateOnly = post.preferredMoveDate.split("T")[0];
  const today = new Date().toISOString().split("T")[0];
  const moveDate = dateOnly < today ? "Now" : dateOnly;

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-4xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 pt-20">{post.name}</h2>
      <h3 className="text-xl text-gray-600 mb-4">{post.age} years old, ({post.gender})</h3>

      <hr className="border-gray-200 mb-6" />

      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {/* Monthly Budget */}
        <div className="flex items-center gap-4 justify-center bg-gray-50 p-4 rounded-lg shadow-lg transition-all hover:shadow-xl">
          <FaMoneyBill size={30} className="text-blue-500" />
          <div className="text-center">
            <p className="font-bold text-gray-800">{post.monthlyBudget} / month</p>
            <p className="text-sm text-gray-500">Budget</p>
          </div>
        </div>

        {/* Stay Length */}
        <div className="flex items-center gap-4 justify-center bg-gray-50 p-4 rounded-lg shadow-lg transition-all hover:shadow-xl">
          <LuClock4 size={30} className="text-orange-500" />
          <div className="text-center">
            <p className="font-bold text-gray-800">{post.max}</p>
            <p className="text-sm text-gray-500">Stay length</p>
          </div>
        </div>

        {/* Move Date */}
        <div className="flex items-center gap-4 justify-center bg-gray-50 p-4 rounded-lg shadow-lg transition-all hover:shadow-xl">
          <FaTruck size={30} className="text-green-500" />
          <div className="text-center">
            <p className="font-bold text-gray-800">{moveDate}</p>
            <p className="text-sm text-gray-500">Move date</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* About Me Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800">About Me</h3>
        <p className="text-gray-700 mt-2">{post.introduction}</p>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Preferred Accommodation Types */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800">Preferred Accommodation Types</h3>
        <h4 className="text-lg font-medium text-gray-600">{post.placeType}</h4>
        <ul className="flex flex-wrap gap-3 mt-4">
          {post.details.map((item, index) => (
            <li key={index} className="flex items-center gap-1 rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-600 shadow-md transition-all hover:bg-blue-200">
              <FaCheck />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Preferred Locations */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800">Preferred Location</h3>
        <h4 className="text-lg font-medium text-gray-600">{post.location}</h4>
        <p className="text-sm text-gray-500 mt-2">Contact Detail: {post.phoneNumber}</p>
      </div>
    </div>
  );
};

export default SeekerDetails;
