import React, { useState, useRef } from "react";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet"
import L from "leaflet";
import useSwr from "swr";
// Data
import nationalParkData from "./data/national-parks.json";
// Styles
import "./App.css"
import "leaflet/dist/leaflet.css";

const fetcher = (...args) => fetch(...args).then(response => response.json());

function App() {
  const position = [39.8283, -98.5795]
  const [activePark, setActivePark] = useState(null);
  const [apiData, setApiData] = useState([]);
  const url ="https://opendata.arcgis.com/datasets/3451bcca1dbc45168ed0b3f54c6098d3_0.geojson"
  const { data, error } = useSwr(url, { fetcher });


  // Create custom marker from svg
  const markerIcon : L.DivIcon = L.divIcon({
    className: "park-marker",
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [15, 0]
});

  // Fetch data from API
  function doFetch(){
  console.log("fetching data from API...");
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("this is data", data)
          setApiData(data.features)
      });
    }
  
  return (
    <MapContainer center={position} zoom={5} scrollWheelZoom={false}>
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
          <Popup>
            <div className="popup">
              <h2>{park.properties.Code}</h2>
              <p>{park.properties.Name}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
