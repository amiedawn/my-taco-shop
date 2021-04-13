import { gql } from '@apollo/client';

// login
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// signup
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($items: [ID]!) {
    addOrder(items: $items) {
      purchaseDate
      items {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const SEND_CONTACT_EMAIL = gql`
  mutation sendContactEmail($email: String!, $name: String!, $message: String!) {
    sendContactEmail(from: $email, name: $name, text: $message)
  }
`;
