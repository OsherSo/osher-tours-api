const Footer = ({ tour }) => {
  return (
    <div className="card__footer">
      <p>
        <span className="card__footer-value">{`$${tour.price}`}</span>{" "}
        <span className="card__footer-text">per person</span>
      </p>
      <p className="card__ratings">
        <span className="card__footer-value">{tour.ratingsAverage}</span>{" "}
        <span className="card__footer-text">{`rating (${tour.ratingsQuantity})`}</span>
      </p>
      <a className="btn btn--green btn--small" href={`/tour/${tour.slug}`}>
        Details
      </a>
    </div>
  );
};

export default Footer;
