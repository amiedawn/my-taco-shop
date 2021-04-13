import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const items = cart.map((foodItem) => foodItem._id);

      if (items.length) {
        const { data } = await addOrder({ variables: { items } });
        const itemData = data.addOrder.items;

        itemData.forEach((foodItem) => {
          idbPromise('cart', 'delete', foodItem);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h3>Success! Thank you for your purchase!</h3>
        <p>You will now be redirected to the home page</p>
      </Jumbotron>
    </div>
  );
}

export default Success;
