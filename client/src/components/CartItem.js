import React from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { idbPromise } from '../utils/helpers';

const CartItem = ({ foodItem }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (removeItem) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: removeItem._id,
    });
    idbPromise('cart', 'delete', { ...removeItem });
  };

  const onChange = (e) => {
    const { value } = e.target;

    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: foodItem._id,
      });

      idbPromise('cart', 'delete', { ...foodItem });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: foodItem._id,
        purchaseQuantity: parseInt(value, 10),
      });

      idbPromise('cart', 'put', { ...foodItem, purchaseQuantity: parseInt(value, 10) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${foodItem.image}`} alt="" />
      </div>
      <div>
        <div>
          {foodItem.name}, ${foodItem.price}
        </div>
        <div>
          <span>Qty:</span>
          <input type="number" placeholder="1" value={foodItem.purchaseQuantity} onChange={onChange} />
          <i className="material-icons" onClick={() => removeFromCart(foodItem)}>
            delete
          </i>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
