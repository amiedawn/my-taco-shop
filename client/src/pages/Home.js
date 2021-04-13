import React from 'react';
// import ItemList from '../components/ItemList';
// import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';
import Ingredients from '../assets/ingredients.jpeg';

const Home = () => (
  <div>
    <div>
      <img src={Ingredients} alt="taco ingredients" width="100%" />
    </div>
    <div className="section">
      <div className="container">
        <h2 className="header center">Every dish on the menu tells the unique story of our family.</h2>
        <div className="row">
          <div className="col s12 m4 l4 center-align">
            <i className="large material-icons" style={{ color: 'var(--orange)' }}>
              wb_sunny
            </i>
            <h5>Sustainable gastronomy</h5>
          </div>
          <div className="col s12 m4 l4 center-align">
            <i className="large material-icons" style={{ color: 'var(--green)' }}>
              local_dining
            </i>
            <h5>Locally owned and operated</h5>
          </div>
          <div className="col s12 m4 l4 center-align">
            <i className="large material-icons" style={{ color: 'var(--red)' }}>
              favorite
            </i>
            <h5>Family-friendly atmosphere</h5>
          </div>
        </div>
      </div>
    </div>
    <Cart />
  </div>
);

export default Home;
