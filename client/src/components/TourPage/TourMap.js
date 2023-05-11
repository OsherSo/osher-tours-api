import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const TourMap = ({ tour }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, { zoomControl: false });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      var greenIcon = L.icon({
        iconUrl: "/img/pin.png",
        iconSize: [32, 40],
        iconAnchor: [16, 45],
        popupAnchor: [0, -50],
      });

      const points = [];
      tour.locations.forEach((loc) => {
        points.push([loc.coordinates[1], loc.coordinates[0]]);
        L.marker([loc.coordinates[1], loc.coordinates[0]], { icon: greenIcon })
          .addTo(map)
          .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
            autoClose: false,
            className: "mapPopup",
          })
          .openPopup();
      });

      const bounds = L.latLngBounds(points).pad(0.5);
      map.fitBounds(bounds);
      map.scrollWheelZoom.disable();

      mapInstanceRef.current = map;
    }

    return () => {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    };
  }, [tour]);

  return (
    <section className="section-map">
      <div ref={mapRef} style={{ height: "100vh" }}></div>
    </section>
  );
};

export default TourMap;
