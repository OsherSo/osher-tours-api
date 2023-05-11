function TourPictures({ tour }) {
  const { images } = tour;

  return (
    <section className="section-pictures">
      {images.map((image, i) => (
        <div className="picture-box" key={`${tour.name}-${i}`}>
          <img
            className={`picture-box__img picture-box__img--${i + 1}`}
            src={`/img/tours/${image}`}
            alt={`${tour.name} ${i + 1}`}
          />
        </div>
      ))}
    </section>
  );
}

export default TourPictures;
