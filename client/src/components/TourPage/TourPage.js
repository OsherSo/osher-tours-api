import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import TourHeader from "./TourHeader";
import TourDescription from "./TourDescription";
import TourPictures from "./TourPictures";
import TourMap from "./TourMap";
import TourReviews from "./TourReviews";
import TourFooter from "./TourFooter";

const TourPage = () => {
  const [tour, setTour] = useState(null);
  const { slug } = useParams();
  const url = `http://localhost:8000/api/v1/tours?slug=${slug}`;

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(url);
        setTour(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTour();
  }, [url]);

  return (
    <div>
      {tour && <TourHeader tour={tour} />}
      {tour && <TourDescription tour={tour} />}
      {tour && <TourPictures tour={tour} />}
      {tour && <TourMap tour={tour} />}
      {tour && <TourReviews tour={tour} />}
      {tour && <TourFooter tour={tour} />}
    </div>
  );
};

export default TourPage;
