import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

interface UpdateButtonProps {
    onUpdate: (itemId: string, updatedData: any, type: string) => void;
    itemId: string;
    itemType: string;
}

const UpdateButton: FC<UpdateButtonProps> = ({ onUpdate, itemId, itemType }) => {
    const navigate = useNavigate();

    const handleClick = (): void => {
        navigate(`/update/${itemType}/${itemId}`);
    };

    return (
        <button
            onClick={handleClick}
            className="absolute top-2 left-3 flex items-center px-4 py-2 overflow-hidden font-sm text-sm transition-all bg-green-500 rounded-md opacity-80 hover:opacity-100 group z-10"
        >
            <span className="absolute top-0 right-0 inline-block w-3 h-3 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-mr-3 group-hover:-mt-3">
                <span className="absolute top-0 right-0 w-4 h-4 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-3 h-3 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-ml-3 group-hover:-mb-3">
                <span className="absolute top-0 right-0 w-4 h-4 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-green600 rounded-md group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration200 ease-in-out group-hover:text-white">
                Update
            </span>
        </button>
    );
};

export default UpdateButton;
