import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from "leaflet";
import { BsFillCursorFill } from 'react-icons/bs';
// Data
import * as nationalParkData from "./data/national-parks.json";
// Styles
import './App.css';

function App() {
  const position = [39.8283, -98.5795]
  const [activePark, setActivePark] = useState(null);

  const arrow = new Icon({
    iconUrl: <BsFillCursorFill/>,
    iconSize: [25, 25]
  });

  return (
    <MapContainer center={position} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {nationalParkData.features.map(park => (
        <Marker
          className="park-marker"
          key={park.properties.PARK_ID}
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
