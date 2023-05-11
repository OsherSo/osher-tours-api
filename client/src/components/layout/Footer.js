const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="/img/logo-green.png" alt="Natours logo" />
      </div>
      <ul className="footer__nav">
        <li>
          <p>About us</p>
        </li>
        <li>
          <p>Download apps</p>
        </li>
        <li>
          <p>Become a guide</p>
        </li>
        <li>
          <p>Careers</p>
        </li>
        <li>
          <p>Contact</p>
        </li>
      </ul>
      <p className="footer__copyright">
        &copy; by Osher Solimany. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
