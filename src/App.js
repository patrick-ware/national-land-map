import React, { useState, useRef } from "react";
import { MapContainer, Marker, Polygon, Popup, Tooltip, TileLayer } from "react-leaflet"
import L from "leaflet";
// Material design components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// Swr for data fetching
import useSwr from "swr";
// Data
import nationalParkData from "./data/national-parks.json";
// Styles
import "./App.css"
import "leaflet/dist/leaflet.css";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const position = [39.8283, -98.5795]
  const [activePark, setActivePark] = useState(null);
  const [apiData, setApiData] = useState([]);
  const url ="https://opendata.arcgis.com/datasets/3451bcca1dbc45168ed0b3f54c6098d3_0.geojson"
  const { data, error } = useSwr(url, { fetcher });

  // Create custom marker
  const markerIcon : L.DivIcon = L.divIcon({
    className: "park-marker",
    iconSize: [30, 30],
    iconAnchor: [0, 0],
    popupAnchor: [8, 10]
  });
    
  // Material UI
  const classes = useStyles();

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
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              National Map
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
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
            <Tooltip direction="top" offset={[7, 10]}>
              {park.properties.Name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
