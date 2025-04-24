import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import ChatWidget from "../components/ChatWidget";

const MapView = dynamic(() => import("../components/MapView"), {
  ssr: false,
});

const Home = () => {
  const [outlets, setOutlets] = useState([]);
  const [showCircles, setShowCircles] = useState(true);
  const [radius, setRadius] = useState(5000);

  useEffect(() => {
    axios
      .get("https://rqh6lf-8000.csb.app/outlets")
      .then((res) => setOutlets(res.data))
      .catch((err) => console.error("Failed to fetch data", err));
  }, []);

  return (
    <div>
      <div
        style={{
          position: "fixed", // fixed to viewport
          top: 20,
          left: 50,
          zIndex: 1000,
          background: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <label>
          Show Circles
          <input
            type="checkbox"
            checked={showCircles}
            onChange={() => setShowCircles(!showCircles)}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
        <select
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          style={{ marginLeft: "1rem" }}
        >
          <option value={1000}>1 KM</option>
          <option value={3000}>3 KM</option>
          <option value={5000}>5 KM</option>
          <option value={10000}>10 KM</option>
          <option value={15000}>15 KM</option>
        </select>
      </div>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <main style={{ flex: 1 }}>
          <MapView
            outlets={outlets}
            showCircles={showCircles}
            radius={radius}
          />
        </main>
      </div>
      <ChatWidget />
    </div>
  );
};

export default Home;
