// components/MapView.js
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  useEffect(() => {
    const map = L.map("map").setView([3.139, 101.6869], 12); // KL coords

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  }, []);

  return <div id="map" style={{ height: "600px", width: "100%" }} />;
}
