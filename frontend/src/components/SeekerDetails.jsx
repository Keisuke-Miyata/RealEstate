import React from "react";
import { FaMoneyBill, FaCheck } from "react-icons/fa";
import { LuClock4 } from "react-icons/lu";
import { FaTruck } from "react-icons/fa6";

const SeekerDetails = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg mt-20 p-8 mx-auto max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.name}</h2>
      <h3 className="text-xl text-gray-600 mb-6">{post.age} years old, {post.gender}</h3>
      
      <hr className="border-gray-200 mb-6" />

      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
        {/* Monthly Budget */}
        <div className="flex items-center gap-4 justify-center bg-gray-50 p-4 rounded-lg shadow-md">
          <FaMoneyBill size={30} className="text-blue-500" />
          <div className="text-center">
            <p className="font-bold text-gray-800">{post.monthlyBudget} / month</p>
            <p className="text-sm text-gray-500">Budget</p>
          </div>
        </div>

        {/* Stay Length */}
        <div className="flex items-center gap-4 justify-center bg-gray-50 p-4 rounded-lg shadow-md">
          <LuClock4 size={30} className="text-orange-500" />
          <div className="text-center">
            <p className="font-bold text-gray-800">{post.max} months</p>
            <p className="text-sm text-gray-500">Stay length</p>
          </div>
        </div>

        {/* Move Date */}
        <div className="flex items-center gap-4 justify-center bg-gray-50 p-4 rounded-lg shadow-md">
          <FaTruck size={30} className="text-green-500" />
          <div className="text-center">
            <p className="font-bold text-gray-800">{post.preffedMoveDate}</p>
            <p className="text-sm text-gray-500">Move date</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* About Me Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800">About Me</h3>
        <p className="text-gray-700 mt-2">{post.introduction}</p>
        <ul className="flex flex-wrap gap-3 mt-4">
          {post.details.map((item, index) => (
            <li key={index} className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              <FaCheck />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Property Preferences */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800">Property Preferences</h3>
        <ul className="mt-4 space-y-2">
          {post.details.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Preferred Accommodation Types */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800">Preferred Accommodation Types</h3>
        <ul className="flex flex-wrap gap-3 mt-4">
          {post.details.map((item, index) => (
            <li key={index} className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              <FaCheck />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Preferred Locations */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800">Preferred Locations</h3>
        <ul className="flex flex-wrap gap-3 mt-4">
          {post.details.map((item, index) => (
            <li key={index} className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              <FaCheck />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeekerDetails;
