import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import { useState } from "react";
import axios from "axios";

const MapView = dynamic(() => import("../components/MapView"), {
  ssr: false,
});

export default function Home() {
  // const [outlets, setOutlets] = useState([]);
  const [outlets] = useState([]);
  const [showCircles, setShowCircles] = useState(true);
  const [radius, setRadius] = useState(5000); // Default: 5KM

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const res = await axios.get(
          "https://mcd-locate-us-backend-9632d6133c9e.herokuapp.com/outlets"
        );
        console.log(res);
        // setOutlets(res.data);
      } catch (error) {
        console.error("Failed to fetch outlet data:", error.message);
      }
    };

    fetchOutlets();
  }, []);

  return (
    <div>
      <h1>McDonald’s Outlets in KL</h1>

      <div style={{ margin: "10px 0" }}>
        <label>
          <input
            type="checkbox"
            checked={showCircles}
            onChange={() => setShowCircles(!showCircles)}
          />
          Show 5KM Catchment Circles
        </label>

        <select
          style={{ marginLeft: "20px" }}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
        >
          <option value={3000}>3KM</option>
          <option value={5000}>5KM</option>
          <option value={10000}>10KM</option>
          <option value={15000}>15KM</option>
        </select>
      </div>

      <MapView outlets={outlets} showCircles={showCircles} radius={radius} />
    </div>
  );
}
