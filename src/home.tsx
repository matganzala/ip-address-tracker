import React, { useEffect, useRef, useState } from "react";
import { IPAddress } from "./ipModel";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

export function Home() {
  const [ip, setIp] = useState("");
  const [returnIp, setReturnIp] = useState<IPAddress | undefined>();
  const [coordinates, setCoordinates] = useState<LatLngExpression | undefined>([51.505, -0.09]);
  const mapRef: any = useRef<MapContainer>();

  function searchIp(value: string) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_OBrOLLWo1VmikzlvkrswgbAyEZf7i&ipAddress=${value.trim()}`
    )
      .then((response) => response.json())
      .then((result) => {
        setReturnIp(result);
        if (result?.location?.lat && result?.location?.lng) {
          setCoordinates([result.location.lat, result.location.lng]);
        }
      });
  }

  useEffect(() => {
    if (mapRef.current && coordinates) {
      const map = mapRef.current;
      map.whenReady(() => {
        map.flyTo(coordinates, 13);
      });
    }
  }, [coordinates]);

  return (
    <div >
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap space-x-2 mt-2">
          <input
            type="text"
            name=""
            id=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIp(e.target.value)}
            placeholder="Pesquisa"
            className="border-solid border-2 border-indigo-600 p-5"
          />
          <div className="flex flex-row items-center space-x-2">
            <button onClick={() => searchIp(ip)}>Acessar</button>
            <p className="underline text-[10px]">Don't know your ip?</p>
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <input
            type="text"
            placeholder="IP"
            value={returnIp?.ip}
            className="mt-2 border-solid border-2 border-indigo-600 p-3"
          />
          <input
            type="text"
            placeholder="Location"
            className="mt-2 border-solid border-2 border-indigo-600 p-3"
            value={
              returnIp?.location?.city && returnIp?.location?.country
                ? `${returnIp.location.city}, ${returnIp.location.country}`
                : ""
            }
          />
          <input
            type="text"
            placeholder="TIMEZONE"
            className="mt-2 border-solid border-2 border-indigo-600 p-3"
            value={returnIp?.location?.timezone}
          />
          <input
            type="text"
            placeholder="ISP"
            className="mt-2 border-solid border-2 border-indigo-600 p-3"
            value={returnIp?.isp}
          />
        </div>
      </div>
      <div style={{ height: "calc(100vh - 200px)" }}>
        <MapContainer center={coordinates} zoom={13} style={{ height: "100%", width: "100%" }} ref={mapRef}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          {coordinates && (
            <Marker position={coordinates} key={coordinates.toString()}>
              <Popup>Hello, I'm a marker!</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
