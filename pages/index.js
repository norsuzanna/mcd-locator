import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../components/MapView"), {
  ssr: false,
});

const Home = () => {
  const [outlets, setOutlets] = useState([]);
  const [showCircles, setShowCircles] = useState(true);
  const [radius, setRadius] = useState(5000);

  useEffect(() => {
    axios
      .get("https://mcd-locate-us-backend-9632d6133c9e.herokuapp.com/outlets")
      .then((res) => setOutlets(res.data))
      .catch((err) => console.error("Failed to fetch data", err));
  }, []);

  return (
    <div>
      <div style={{ margin: "1rem 0" }}>
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
    </div>
  );
};

export default Home;
