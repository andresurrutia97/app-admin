import React, { useState } from "react";
import InteractiveMap, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// const TOKEN = config.REACT_APP_TOKEN;

const TOKEN =
  "pk.eyJ1IjoidXJ1OTciLCJhIjoiY2s4N3BnZ2huMDBibDNsczF4amVkMWYzeSJ9.gMDIcSkvh9F6QfGco7pxsg";

const geolocateStyle = {
  float: "left",
  margin: "10px"
};

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

  return (
    <div style={{ padding: "10px" }}>
      <InteractiveMap
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={onViewportChange}
        onClick={marker}
      >
        {markers.length
          ? markers.map((m, i) => (
              // <Marker /> just places its children at the right lat lng.
              <Marker {...m} key={i}>
                <span className="material-icons">place</span>
              </Marker>
            ))
          : null}
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </InteractiveMap>
    </div>
  );
};

export default Map;
