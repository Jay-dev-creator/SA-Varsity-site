import React, { useState, useEffect } from "react";
import data from "./data";
import Loading from "./Loading";
import University from "./University";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
function App() {
  const [loading, setLoading] = useState(true);
  const [universities, setUniversities] = useState(data);
  var location = University;

  //eliminating universities
  const removeUni = (id) => {
    let newUni = universities.filter((university) => university.id !== id);
    setUniversities(newUni);
  };

  const fetchUniversities = async () => {
    setLoading(true);

    try {
      const response = await fetch(data);
      const universities = await response.json();
      setLoading(false);
      setUniversities(universities);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    console.log(universities);
  };
  useEffect(() => {
    fetchUniversities();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (universities.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No universities left</h2>
          <p>Please refresh the page</p>
        </div>
      </main>
    );
  }
  return (
    <main>
      <section>
        <div className="title">
          <h2 data-aos="fade-up">{universities.length} SA Universities</h2>

          <div className="underline"></div>
          <p>
            <small className="text-muted">
              {location.loaded
                ? JSON.stringify(location)
                : "This site requires permision to access location, if not granted please do so."}
            </small>
          </p>
        </div>
        <div>
          <University
            universities={universities}
            removeUni={removeUni}
            key={University.id}
            location={location}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
