import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs, Marker } from "react-google-maps";

function Map() {
  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
      >
        <Marker defaultDraggable position={{ lat: 20.5937, lng: 78.9629 }} />
      </GoogleMap>
    </div>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function Mapps() {
  return (
    <div style={{ width: "750px", height: "72vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBWNQLRv3EWDkqWisSDetL5-7iuJYCGLfM&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}

      />
    </div>
  );
}
