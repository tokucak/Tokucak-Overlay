import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as RTIRL from "@rtirl/api";

const pullKey = "ak6fu9l6rf4x4kav";

export default function RealtimeMap({ onSpeedChange }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      center: [36.78, 31.44],
      zoom: 17,
    });

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
      }
    ).addTo(map);

    mapInstance.current = map;

    console.log("RealtimeIRL API:", RTIRL);

    const client = RTIRL.forPullKey(pullKey);

    subscriptionRef.current = client.addListener((data) => {
      console.log("RealtimeIRL data:", data);

      if (!data?.location) return;

      const latitude = data.location.latitude;
      const longitude = data.location.longitude;

      if (
        typeof latitude !== "number" ||
        typeof longitude !== "number"
      ) {
        return;
      }

      const position = [latitude, longitude];

      map.setView(position, 17, {
        animate: false,
      });

      if (!markerRef.current) {
        markerRef.current = L.circleMarker(position, {
          radius: 7,
          color: "#ffffff",
          weight: 2,
          fillColor: "#34d399",
          fillOpacity: 1,
        }).addTo(map);
      } else {
        markerRef.current.setLatLng(position);
      }

      let speed = null;

      if (typeof data.speed === "number") {
        speed = data.speed;
      }

      else if (
        typeof data.location.speed === "number"
      ) {
        speed = data.location.speed;
      }

      if (typeof speed === "number") {
        const speedKmh =
          speed < 100
            ? speed * 3.6
            : speed;

        onSpeedChange?.(
          Math.max(0, Math.round(speedKmh))
        );
      }
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current();
        subscriptionRef.current = null;
      }

      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }

      markerRef.current = null;
    };
  }, [onSpeedChange]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}