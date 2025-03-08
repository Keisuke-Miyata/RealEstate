import React, { useEffect, useState, FC } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

interface MapProps {
    address: string;
}

interface Coordinates {
    lat: number;
    lon: number;
}

const Map: FC<MapProps> = ({ address }) => {
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        const getCoordinates = async (): Promise<void> => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1`
                );
                const data: any[] = await response.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
                    setError(null);
                } else {
                    setCoordinates(null);
                    setError("Address not found.");
                }
            } catch (fetchError) {
                setCoordinates(null);
                setError("Error fetching coordinates.");
            }
        };

        if (address) {
            getCoordinates();
        }
    }, [address]);

    let content;

    if (error) {
        content = <p>{error}</p>;
    } else if (coordinates) {
        content = (
            <MapContainer center={[coordinates.lat, coordinates.lon]} zoom={13} className="w-full h-full z-0">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Circle
                    center={[coordinates.lat, coordinates.lon]}
                    radius={500}
                    color="blue"
                    fillColor="rgba(0, 0, 255, 0.3)"
                    fillOpacity={0.3}
                />
            </MapContainer>
        );
    } else {
        content = <p>Loading map...</p>;
    }

    return (
        <div className="relative w-full h-96">
            {content}

            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-6 py-2 rounded-full text-center max-w-xs w-full z-50">
                Message for exact location
            </div>
        </div>
    );
};

export default Map;