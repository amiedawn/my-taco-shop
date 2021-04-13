import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import MenuItem from './MenuItem';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_ITEMS } from '../utils/actions';
import { QUERY_ITEMS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function ItemList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_ITEMS);

  // console.log(data);
  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // let's store it in the global state object
      dispatch({
        type: UPDATE_ITEMS,
        items: data.items,
      });

      // but let's also take each item and save it to IndexedDB using the helper function
      data.items.forEach((item) => {
        idbPromise('items', 'put', item);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `items` store
      idbPromise('items', 'get').then((items) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_ITEMS,
          items,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterItems() {
    if (!currentCategory) {
      return state.items;
    }

    return state.items.filter((item) => item.category._id === currentCategory);
  }

  return (
    <div className="row">
      <h3>Menu</h3>
      <p> Click on a menu image for more information</p>
      {state.items.length ? (
        <div className="row">
          {filterItems().map((item) => (
            <MenuItem
              key={item._id}
              _id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any items yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ItemList;
