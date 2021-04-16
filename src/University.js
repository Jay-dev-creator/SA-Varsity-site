import React, { useState, useEffect } from "react";
import data from "./data";
import Aos from "aos";

const University = ({ universities, removeUni }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [readMore, setReadMore] = useState(false);
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  //sorting the list
  data.sort((a, b) => (a.lat > b.lat ? -1 : 1));

  //calculating distance
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
  var lat1 = parseFloat(location.coordinates.lat);
  var lon1 = parseFloat(location.coordinates.lng);

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
          message: "geolocation not supported",
        },
      }));
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return (
    <>
      {universities.map(
        ({ id, image, info, name, lat, lng, apply, prospectus }) => {
          var getDistance = distance(lat1, lat, lon1, lng).toFixed(1);
          return (
            <article data-aos="fade-up" className="single-tour">
              <img data-aos="fade-up" src={image} alt={name} />
              <footer>
                <div className="tour-info">
                  <h4>{name}</h4>
                  <h4 className="tour-price">
                    <p>{getDistance} km</p>
                  </h4>
                </div>
                <p>
                  {readMore ? info : `${info.substring(0, 100)}...`}
                  <button onClick={() => setReadMore(!readMore)}>
                    {readMore ? "show less" : "read more"}
                  </button>
                </p>
                <a
                  data-aos="fade-up"
                  type="button"
                  href={apply}
                  className="btn"
                  target="_blank"
                >
                  apply
                </a>
                <a
                  data-aos="fade-up"
                  href={prospectus}
                  className="btn"
                  target="_blank"
                >
                  prospectus
                </a>
                <button className="delete-btn" onClick={() => removeUni(id)}>
                  not interested
                </button>
              </footer>
            </article>
          );
        }
      )}
    </>
  );
};

export default University;
