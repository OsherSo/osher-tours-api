const OverviewBox = ({ label, text, icon }) => {
  return (
    <div className="overview-box__detail">
      <svg className="overview-box__icon">
        <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
      </svg>
      <span className="overview-box__label">{label}</span>
      <span className="overview-box__text">{text}</span>
    </div>
  );
};

const TourDescription = ({ tour }) => {
  const {
    startDates,
    difficulty,
    maxGroupSize,
    ratingsAverage,
    guides,
    name,
    description,
  } = tour;

  const paragraphs = description.split("\n");

  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            <OverviewBox
              label="Next date"
              text={new Date(startDates[0]).toLocaleString("en-us", {
                month: "long",
                year: "numeric",
              })}
              icon="calendar"
            />
            <OverviewBox
              label="Difficulty"
              text={difficulty}
              icon="trending-up"
            />
            <OverviewBox
              label="Participants"
              text={`${maxGroupSize} people`}
              icon="user"
            />
            <OverviewBox
              label="Rating"
              text={`${ratingsAverage} / 5`}
              icon="star"
            />
          </div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
            {guides.map((guide) => (
              <div className="overview-box__detail" key={guide.name}>
                <img
                  className="overview-box__img"
                  src={`/img/users/${guide.photo}`}
                  alt={guide.name}
                />
                <span className="overview-box__label">
                  {guide.role === "guide" ? "Tour guide" : "Lead guide"}
                </span>
                <span className="overview-box__text">{guide.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">{`About ${name} tour`}</h2>
        {paragraphs.map((p, i) => (
          <p key={i} className="description__text">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
};

export default TourDescription;
