import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { IPAddress } from "./ipModel";

export function Home() {
  const [ip, setIp] = useState("");
  const [returnIp, setReturnIp] = useState<IPAddress | undefined>();
  const z = 13;

  const initialCoordinates: LatLngExpression = [37.7749, -122.4194]; // Coordenadas iniciais do Google (San Francisco)

  function searchIp(value: string) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_OBrOLLWo1VmikzlvkrswgbAyEZf7i&ipAddress=${value.trim()}`
    )
      .then((response) => response.json())
      .then((result) => {
        setReturnIp(result);
      });
  }

  

  return (
    <div style={{ height: "100vh" }}>
      <div className="flex flex-col justify-center items-center">
        {/* Restante do código dos inputs... */}
      </div>
      <MapContainer
        center={initialCoordinates}
        zoom={z}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {returnIp?.location?.lat && returnIp?.location?.lng && (
          <Marker position={[returnIp.location.lat, returnIp.location.lng]}>
            <Popup>{`${returnIp.location.city}, ${returnIp.location.country}`}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
