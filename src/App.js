import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, Marker, Polygon, Popup, Tooltip, TileLayer } from "react-leaflet"
import L from "leaflet";
// Data
import nationalParkData from "./data/national-parks.json";
// Styles
import "./App.css"
import "leaflet/dist/leaflet.css";

function App() {
  const center = [39.8283, -98.5795];
  const zoom = 5;
  const [activePark, setActivePark] = useState(null)
  const [map, setMap] = useState(null)

  // Display coordinates and zoom reset
  function DisplayPosition({ map }) {
    const [position, setPosition] = useState(map.getCenter())

    const onClick = useCallback(() => {
      map.setView(center, zoom)
    }, [map])

    const onMove = useCallback(() => {
      setPosition(map.getCenter())
    }, [map])

    useEffect(() => {
      map.on('move', onMove)
      return () => {
        map.off('move', onMove)
      }
    }, [map, onMove])

    return (
      <div>
        <span>Latitude: {position.lat.toFixed(4)}, Longitude: {position.lng.toFixed(4)}{' '}<button className="button" onClick={onClick}>reset view</button></span>
      </div>
    )
  }

  // Create custom marker
  const markerIcon : L.DivIcon = L.divIcon({
    className: "park-marker fade-in",
    iconSize: [10, 10],
    iconAnchor: [0, 0],
    popupAnchor: [8, 10]
  });

  //

  return (
    <div>
      <div className="title-bar">
        <div className="title-bar-title"> National Lands Map </div>
      </div>
      <div>
        <div className="control-panel">
          {map ? <DisplayPosition map={map} /> : null}
        </div>
        <MapContainer className="fade-in" center={center} zoom={zoom} scrollWheelZoom={false} whenCreated={setMap}>
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
              <Tooltip direction="top" offset={[6, 3]}>
                <span className="tooltip"> {park.properties.Name}</span>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
