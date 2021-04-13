import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <div className="container">
      <Link to="/Menu">← Back to Menu</Link>

      {user ? (
        <div className="row">
          <h3>Neato, burrito! Here's the order history for {user.username}!</h3>
          {user.orders.map((order) => (
            <div key={order._id}>
              <h5>{new Date(parseInt(order.purchaseDate, 10)).toLocaleDateString()}</h5>
              <div className="flex-row">
                {order.items.map(({ _id, image, name, price }) => (
                  <div key={_id} className="card">
                    <Link to={`/items/${_id}`}>
                      <img alt={name} src={`/images/${image}`} />
                      <p>{name}</p>
                    </Link>
                    <div>
                      <span>${price}.00</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default OrderHistory;
