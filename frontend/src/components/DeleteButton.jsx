import React from "react";

const DeleteButton = ({ onDelete, setState, itemId, itemType }) => {
    const handleClick = async () => {
        if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
            try {
                await onDelete(itemId, itemType);
                setState((prev) => prev.filter((item) => item.id !== itemId));
            } catch (error) {
                alert(`Failed to delete ${itemType}: ${error.message}`);
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            className="absolute top-2 left-48 flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
        >
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Delete
            </span>
        </button>
    );
};

export default DeleteButton;
