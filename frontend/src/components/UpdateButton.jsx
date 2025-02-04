import React from "react";
import { useNavigate } from "react-router-dom";


const UpdateButton = ({ onUpdate, itemId, itemType }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // if (window.confirm(`Are you sure you want to update this ${itemType}?`)) {
        //     onUpdate(itemId);
        // }
        navigate(`/update/${itemType}/${itemId}`);

    };

    return (
        <button
            onClick={handleClick}
            className="absolute top-2 left-3 flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-green-500 rounded-md group"
        >
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-green-600 rounded-md group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Update
            </span>
        </button>
    );
};

export default UpdateButton;
