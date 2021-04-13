import React from 'react';

const Footer = () => (
  <footer className="page-footer orange center-align">
    <div className="container">
      <div className="row">
        <div className="col l12 s12">
          <ul className="flex-row">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="waves-effect waves-light btn-floating facebook"
              >
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer"
                className="waves-effect waves-light btn-floating twitter"
              >
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="waves-effect waves-light btn-floating instagram"
              >
                <i className="fa fa-instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">&copy;2021 by The Taco Team</div>
    </div>
  </footer>
);

export default Footer;
