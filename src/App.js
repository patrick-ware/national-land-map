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
  const greenOptions = { color: 'green' }

  const url ="https://opendata.arcgis.com/datasets/3451bcca1dbc45168ed0b3f54c6098d3_0.geojson"
  const { data, error } = useSwr(url, { fetcher });
  const nationalForests = data && !error ? data.features :[];

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
