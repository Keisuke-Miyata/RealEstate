import React, { useState, FC } from "react";
import FavoriteButton from "../buttons/FavoriteButton";
import { useLocation } from "react-router-dom";

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleNext = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const { pathname } = useLocation();
    const id: string = pathname.split('/').slice(-1)[0];
    const parts: string[] = pathname.split('/');
    const type: string = parts[parts.length - 2];

    if (!images || images.length === 0) {
        return <div>No images available</div>;
    }

    return (
        <div id="default-carousel" className="relative top-20" data-carousel="slide">
            <FavoriteButton id={id} type={type} />

            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {images.map((image: string, index: number) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full duration-700 ease-in-out ${index === currentIndex ? "block" : "hidden"
                            }`}
                        data-carousel-item
                    >
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        />
                    </div>
                ))}
            </div>

            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {images.map((_, index: number) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                            }`}
                        aria-current={index === currentIndex}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>

            <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={handlePrev}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>

            <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={handleNext}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white50 dark:group-hover:bg-gray800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray800/70">
                    <svg
                        className='w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 6 10'>
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m1 9 4−4−4−4' />
                    </svg>
                    <span className='sr-only'>Next</span>
                </span>
            </button>
        </div>
    );
};

export default ImageCarousel;