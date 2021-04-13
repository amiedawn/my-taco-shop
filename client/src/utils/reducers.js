/* eslint-disable consistent-return */
import { useReducer } from 'react';
import {
  UPDATE_ITEMS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of `UPDATE_ITEMS`, return a new state object with an updated items array
    case UPDATE_ITEMS:
      return {
        ...state,
        items: [...action.items],
      };

    // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.item],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.items],
      };

    case REMOVE_FROM_CART:
      // eslint-disable-next-line no-case-declarations
      const newState = state.cart.filter((item) => item._id !== action._id);

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((item) => {
          if (action._id === item._id) {
            // eslint-disable-next-line no-param-reassign
            item.purchaseQuantity = action.purchaseQuantity;
          }
          return item;
        }),
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    default:
      return state;
  }
};

export function useItemReducer(initialState) {
  return useReducer(reducer, initialState);
}
