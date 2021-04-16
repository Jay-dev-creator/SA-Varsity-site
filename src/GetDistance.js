import React, { useState, useEffect } from "react";


const GetDistance = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  function distance(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return c * r;
  }

  // Driver code
  let lat1 = parseFloat(location.coordinates.lat);
  let lat2 = -22.9757;
  let lon1 = parseFloat(location.coordinates.lng);
  let lon2 = 30.4444;
  let distance2 = distance(lat1, lat2, lon1, lon2);

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation((state) => ({
        ...state,
        loaded: true,
        error: {
          code: 0,
          message: "gelocation not supported",
        },
      }));
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });

  return (
    <div className="App">
      <h1>Coordinates</h1>
      {location.loaded
        ? JSON.stringify(location)
        : "Location data not available yet. Please enable location"}
      <p>distance: {distance2.toFixed(1)} km</p>
    </div>
  );
};

export default GetDistance;
