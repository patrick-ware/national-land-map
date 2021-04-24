import React, { useState, useRef } from "react";
import { MapContainer, Marker, Polygon, Popup, Tooltip, TileLayer } from "react-leaflet"
import L from "leaflet";
// Data
import nationalParkData from "./data/national-parks.json";
// Styles
import "./App.css"
import "leaflet/dist/leaflet.css";

function App() {
  const position = [39.8283, -98.5795]
  const [activePark, setActivePark] = useState(null);

  // Create custom marker
  const markerIcon : L.DivIcon = L.divIcon({
    className: "park-marker",
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [8, 10]
  });

  return (
    <div>
      <div className="control-bar">
        <div className="control-bar-title"> National Lands Map </div>
      </div>
      <MapContainer className="fade-in" center={position} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {nationalParkData.features.map(park => (
          <Marker
            icon={markerIcon}
            key={park.properties.Code}
            position={[
              park.geometry.coordinates[1],
              park.geometry.coordinates[0]
            ]}
            onClick={() => {
              setActivePark(park);
            }}
          >
            <Tooltip direction="top" offset={[7, 10]}>
              <span className="tooltip"> {park.properties.Name}</span>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
