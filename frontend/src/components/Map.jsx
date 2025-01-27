import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import leaflet CSS

const Map = ({ address }) => {
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCoordinates = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1`
                );
                const data = await response.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    setCoordinates({ lat, lon });
                    setError(null); // Clear error if coordinates are found
                } else {
                    setCoordinates(null);
                    setError("Address not found.");
                }
            } catch (error) {
                setCoordinates(null);
                setError("Error fetching coordinates.");
            }
        };

        if (address) {
            getCoordinates();
        }
    }, [address]);

    return (
        <div className="relative w-full h-96">
            {error ? (
                <p>{error}</p>
            ) : coordinates ? (
                <MapContainer center={[coordinates.lat, coordinates.lon]} zoom={13} className="w-full h-full z-0">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Circle
                        center={[coordinates.lat, coordinates.lon]}
                        radius={500} // Radius in meters
                        color="blue"
                        fillColor="rgba(0, 0, 255, 0.3)" // Blue color with opacity
                        fillOpacity={0.3}
                    />
                </MapContainer>
            ) : (
                <p>Loading map...</p>
            )}

            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-6 py-2 rounded-full text-center max-w-xs w-full z-50">
                Message for exact location
            </div>
        </div>
    );
};

export default Map;
