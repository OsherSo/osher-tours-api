const NotFound = () => {
  return (
    <main className="main">
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            Page not found!
          </h2>
        </div>
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            Go to the <a href="/">Homepage</a>
          </h2>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
