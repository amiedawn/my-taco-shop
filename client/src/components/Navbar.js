import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Header from '../assets/header-image.png';

function Navbar() {
  function showNavigation() {
    //   if (Auth.loggedIn()) {
    //     return (
    //       <ul className="flex-row">
    //         <li>
    //           <Link to="/orderHistory">Order History</Link>
    //         </li>
    //         <li>
    //           <Link to="/Menu">Menu</Link>
    //         </li>
    //         <li>
    //           <Link to="/contact">Contact Us</Link>
    //         </li>
    //         <li>
    //           {/* this is not using the Link component to logout or user and then refresh the application to the start */}
    //           <a href="/" onClick={() => Auth.logout()}>
    //             Logout
    //           </a>
    //         </li>
    //       </ul>
    //     );
    //   }

    return (
      <nav>
        <div className="nav-wrapper">
          <ul className="flex-row orange" width="100%">
            <li className="letter-spacing">
              <Link to="/">HOME</Link>
            </li>
            {/* Only shows order history if logged in, only shows login if not logged in */}
            {Auth.loggedIn() ? (
              <li className="letter-spacing">
                {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                <a href="/" onClick={() => Auth.logout()}>
                  LOGOUT
                </a>
              </li>
            ) : (
              <li className="letter-spacing">
                <Link to="/login">LOGIN</Link>
              </li>
            )}
            {/* Only shows logout if logged in, only shows login if not logged in */}
            {Auth.loggedIn() ? (
              <li className="letter-spacing">
                <Link to="/orderHistory">ORDER HISTORY</Link>
              </li>
            ) : (
              <li className="letter-spacing">
                <Link to="/signup">SIGNUP</Link>
              </li>
            )}
            <li className="letter-spacing">
              <Link to="/Menu">MENU</Link>
            </li>
            <li className="letter-spacing">
              <Link to="/aboutUs">ABOUT US</Link>
            </li>
            <li className="letter-spacing">
              <Link to="/contact">CONTACT US</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <div>
      <header>
        <img src={Header} alt="taco 'bout it" />
      </header>
      <nav>{showNavigation()}</nav>
    </div>
  );
}

export default Navbar;
