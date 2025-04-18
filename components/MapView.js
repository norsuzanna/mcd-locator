"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const legendStyle = {
  position: "absolute",
  bottom: "50px",
  left: "20px",
  background: "white",
  padding: "10px 15px",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  zIndex: 1000,
  fontSize: "14px",
  lineHeight: "1.4",
};

const MapView = ({ outlets = [], showCircles = true, radius = 5000 }) => {
  const center = [3.139, 101.6869]; // Default to Kuala Lumpur

  // Default icons
  const customIcon = new L.Icon({
    iconUrl: "/images/cus-marker-purple.png",
    iconSize: [35, 41],
    iconAnchor: [17, 41],
    popupAnchor: [1, -34],
  });

  const redIcon = new L.Icon({
    iconUrl: "/images/cus-marker-red.png", // <-- Make sure this exists in /public/images/
    iconSize: [35, 41],
    iconAnchor: [17, 41],
    popupAnchor: [1, -34],
  });

  // Accurate Haversine distance
  const getDistance = (a, b) => {
    const R = 6371e3;
    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(b.latitude - a.latitude);
    const dLon = toRad(b.longitude - a.longitude);
    const lat1 = toRad(a.latitude);
    const lat2 = toRad(b.latitude);

    const aVal =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
    return R * c;
  };

  // Get intersecting outlets
  const getIntersectingOutlets = () => {
    const intersecting = new Set();

    for (let i = 0; i < outlets.length; i++) {
      for (let j = i + 1; j < outlets.length; j++) {
        const dist = getDistance(outlets[i], outlets[j]);
        if (dist <= radius * 2) {
          intersecting.add(outlets[i].name);
          intersecting.add(outlets[j].name);
        }
      }
    }

    return intersecting;
  };

  const intersectingOutlets = getIntersectingOutlets();

  return (
    <>
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {outlets.map((outlet, idx) => {
          const isIntersecting = intersectingOutlets.has(outlet.name);
          const markerIcon = isIntersecting ? redIcon : customIcon;

          return [
            <Marker
              key={`marker-${idx}`}
              position={[outlet.latitude, outlet.longitude]}
              icon={markerIcon}
            >
              <Popup>
                <strong>{outlet.name}</strong>
                <br />
                {outlet.address}
                <br />
                Hours: {outlet.operating_hours}
                <br />
                Tel: {outlet.telephone}
                <br />
                <a
                  href={outlet.waze_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Waze
                </a>
              </Popup>
            </Marker>,

            showCircles && (
              <Circle
                key={`circle-${idx}`}
                center={[outlet.latitude, outlet.longitude]}
                radius={radius}
                pathOptions={{
                  color: "blue",
                  fillOpacity: 0.02,
                }}
              />
            ),
          ];
        })}
      </MapContainer>
      <div style={legendStyle}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
        >
          <img
            src="/images/cus-marker-purple.png"
            alt="Default"
            width="25"
            height="30"
            style={{ marginRight: 8 }}
          />
          Default Outlet
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/images/cus-marker-red.png"
            alt="Intersected"
            width="25"
            height="30"
            style={{ marginRight: 8 }}
          />
          Intersected Outlet
        </div>
      </div>
    </>
  );
};

export default MapView;
