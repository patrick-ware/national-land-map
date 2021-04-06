import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import useSwr from "swr";
// Data
import * as nationalParkData from "./data/national-parks.json";
// Styles
import './App.css';

const fetcher = (...args) => fetch(...args).then(response => response.json());

function App() {
  const position = [39.8283, -98.5795]
  const [activePark, setActivePark] = useState(null);
  const [apiData, setApiData] = useState([]);

  const url ="https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_ProclaimedForestBoundaries_01/MapServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
  const { data, error } = useSwr(url, { fetcher });
  const nationalForests = data && !error ? data.features :[];

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
          className="park-marker"
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
