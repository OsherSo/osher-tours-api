import Header from "./Header";
import Details from "./Details";
import Footer from "./Footer";

const TourCard = ({ tour }) => {
  return (
    <div className="card">
      <Header tour={tour} />
      <Details tour={tour} />
      <Footer tour={tour} />
    </div>
  );
};

export default TourCard;
