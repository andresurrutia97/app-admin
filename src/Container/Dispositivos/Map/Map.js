import React, { useState } from "react";
import InteractiveMap, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// const TOKEN = config.REACT_APP_TOKEN;

const TOKEN =
  "pk.eyJ1IjoidXJ1OTciLCJhIjoiY2s4N3BnZ2huMDBibDNsczF4amVkMWYzeSJ9.gMDIcSkvh9F6QfGco7pxsg";

const Map = props => {
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 200,
    latitude: 3.3536545765774823,
    longitude: -76.52196515423336,
    zoom: 16.4,
    altitude: 1.5,
    maxZoom: 16.5,
    minZoom: 16.1,
    pitchWithRotate: false
  });

  const [markers, setMarkers] = React.useState([]);

  const onViewportChange = viewport => {
    setViewPort({ ...viewport, transitionDuration: 500 });
  };

  const marker = ({ lngLat: [longitude, latitude] }) => {
    setMarkers([{ longitude, latitude }]);
    props.getPos(longitude, latitude);
  };

  let markerOnMap = null;
  if (props.add) {
    markerOnMap = markers.length
      ? markers.map((m, i) => (
          // <Marker /> just places its children at the right lat lng.

          <Marker {...m} key={i}>
            <span className="material-icons" style={{ color: "#62bc50" }}>
              place
            </span>
          </Marker>
        ))
      : null;
  }
  if (props.info && !props.updateMode) {
    markerOnMap = (
      <Marker longitude={props.coor.long} latitude={props.coor.lat}>
        <span className="material-icons" style={{ color: "#62bc50" }}>
          place
        </span>
      </Marker>
    );
  }

  const [aux, setAux] = useState({
    flag: true
  });

  if (props.info && props.updateMode) {
    const longitude = props.coor.long;
    const latitude = props.coor.lat;
    if (aux.flag) {
      setMarkers([{ longitude, latitude }]);
      props.getPos(longitude, latitude);
      setAux([{ flag: false }]);
    }
    markerOnMap = markers.length
      ? markers.map((m, i) => (
          // <Marker /> just places its children at the right lat lng.

          <Marker {...m} key={i}>
            <span className="material-icons" style={{ color: "#62bc50" }}>
              place
            </span>
          </Marker>
        ))
      : null;
  }

  return (
    <div>
      <InteractiveMap
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={onViewportChange}
        onClick={props.add || props.updateMode ? marker : null}
      >
        {markerOnMap}
      </InteractiveMap>
    </div>
  );
};

export default Map;
