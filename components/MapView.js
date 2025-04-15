"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import icon files (you can replace these with your own custom icon URLs)
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const MapView = ({ outlets = [], showCircles = true, radius = 5000 }) => {
  const center = [3.139, 101.6869]; // Default to Kuala Lumpur

  // Custom Icon
  const customIcon = new L.Icon({
    iconUrl: "/images/cus-marker.png", // Add your custom icon in the public directory
    iconSize: [35, 41], // Adjust size if needed
    iconAnchor: [17, 41], // Adjust anchor position
    popupAnchor: [1, -34],
    shadowUrl: shadowUrl,
    shadowSize: [41, 41],
  });

  // Haversine distance in meters
  const getDistance = (a, b) => {
    const R = 6371e3;
    const lat1 = (a.latitude * Math.PI) / 180;
    const lat2 = (b.latitude * Math.PI) / 180;
    const dLat = lat2 - lat1;
    const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;

    const x =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));

    return R * y;
  };

  const getOverlapping = () => {
    const overlaps = new Set();

    for (let i = 0; i < outlets.length; i++) {
      for (let j = i + 1; j < outlets.length; j++) {
        const dist = getDistance(outlets[i], outlets[j]);
        if (dist <= radius * 2) {
          overlaps.add(outlets[i].name);
          overlaps.add(outlets[j].name);
        }
      }
    }

    return overlaps;
  };

  const overlappingOutlets = getOverlapping();

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {outlets.map((outlet, idx) => (
        <React.Fragment key={idx}>
          <Marker
            position={[outlet.latitude, outlet.longitude]}
            icon={customIcon} // Use the custom icon here
          >
            <Popup>
              <strong>{outlet.name}</strong>
              <br />
              {outlet.address}
              <br />
              Hours: {outlet.operating_hours}
              <br />
              <a
                href={outlet.waze_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Map
              </a>
            </Popup>
          </Marker>
          {showCircles && (
            <Circle
              center={[outlet.latitude, outlet.longitude]}
              radius={radius}
              pathOptions={{
                color: overlappingOutlets.has(outlet.name) ? "red" : "blue",
                fillOpacity: 0.2,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default MapView;
