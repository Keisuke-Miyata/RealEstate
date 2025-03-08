import React, { FC } from 'react';

interface DeleteButtonProps {
    onDelete: (itemId: string, itemType: string) => Promise<void>;
    setState: React.Dispatch<React.SetStateAction<{ id: string }[]>>;
    itemId: string;
    itemType: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({ onDelete, setState, itemId, itemType }) => {
    const handleClick = async (): Promise<void> => {
        if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
            try {
                await onDelete(itemId, itemType);
                setState((prev) => prev.filter((item) => item.id !== itemId));
            } catch (error) {
                alert(`Failed to delete ${itemType}: ${(error as Error).message}`);
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            className="absolute top-2 left-52 flex items-center px-4 py-2 text-sm opacity-80 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group hover:opacity-100 z-10"
        >
            <span className="absolute top-0 right-0 inline-block w-3 h-3 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-3 group-hover:-mt-3">
                <span className="absolute top-0 right-0 w-4 h-4 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-3 h-3 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-3 group-hover:-mb-3">
                <span className="absolute top-0 right-0 w-4 h-4 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Delete
            </span>
        </button>
    );
};

export default DeleteButton;
