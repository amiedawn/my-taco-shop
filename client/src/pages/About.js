import React from 'react';
import family1 from '../assets/family1.jpg';
import family3 from '../assets/family3.jpg';
import Ingredients2 from '../assets/ingredients2.jpeg';

const About = () => (
  <div>
    <div>
      <img src={Ingredients2} alt="taco ingredients" width="100%" />
    </div>
    <div className="section">
      <div className="container">
        <h2 className="header center">Meet the Family...</h2>
        <div className="row center-align">
          <div className="col s12 m12 l6">
            <img src={family1} alt="family" />
          </div>
          <div className="col s12 m12 l6">
            <img src={family3} alt="family3" />
          </div>
          <div className="row">
            <p>
              From our family to yours, <b>Taco 'Bout It</b> dares to whisk you away to the streets of Mexico through
              the smells and taste of our authentic cuisine. Using only recipes handed down for generations, we delight
              in serving our customers with only the finest, freshest ingredients. Abuela Maria still comes in on
              weekends to help prepare her special guacamole. It was she who first started this idea of sharing her
              talents in the kitchen with others. Now forty-eight years later, the legacy lives on.
            </p>
            <p>
              While our menu may be small, the flavors aren’t! We pride ourselves in serving only the best and sticking
              with what we know will be the best Mexican dishes in town! Try our signature tacos, oversized burritos, or
              our mouth-watering quesadillas today!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
