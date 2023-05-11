import { useEffect, useState } from "react";
import axios from "axios";
import TourCard from "./TourCard/TourCard";

const Overview = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/tours");
        setTours(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTours();
  }, []);

  return (
    <main className="main">
      <div className="card-container">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </main>
  );
};

export default Overview;
