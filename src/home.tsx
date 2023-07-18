import { useEffect, useRef, useState } from "react";
import { IPAddress } from "./ipModel";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { FaChevronRight } from "react-icons/fa";
import BgHeader from "./assets/images/pattern-bg-desktop.png";
import { ResponseCard } from "./components/statsIP";

export function Home() {
  const [ip, setIp] = useState("");
  const [returnIp, setReturnIp] = useState<IPAddress | undefined>();
  const [coordinates, setCoordinates] = useState<LatLngExpression | undefined>([
    51.505, -0.09,
  ]);
  const mapRef: any = useRef();

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
    <div className="h-screen">
      <div className="relative h-[30%] max-h-[30vh] ">
        <img
          src={BgHeader}
          alt=""
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="flex flex-col justify-center items-center">
          <h1 className="z-10 font-rubik text-white">IP Address Tracker</h1>
          <div className="flex flex-wrap justify-center z-10 mb-5">
            <input
              type="text"
              onChange={(e) => setIp(e.target.value)}
              placeholder="Search..."
              className="rounded-l-[12px] p-5 outline-none"
            />
            <button
              onClick={() => searchIp(ip)}
              className="p-5 bg-gray-700 rounded-r-[12px]"
            >
              <FaChevronRight className="text-white" />
            </button>
          </div>
          <div className="z-10 mt-7">
            <ResponseCard
              ip={returnIp?.ip}
              location={returnIp?.location}
              timezone={returnIp?.location?.timezone}
              isp={returnIp?.isp}
            />
          </div>
        </div>
      </div>

      <div className="h-[70%] max-h-[70vh]">
        <MapContainer
          center={coordinates}
          zoom={13}
          ref={mapRef}
          className="w-full h-full z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          {coordinates && (
            <Marker position={coordinates} key={coordinates.toString()}>
              <Popup>
                {returnIp?.location?.city}, {returnIp?.location?.country}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
