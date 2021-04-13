import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
      },
    });
    const { token } = mutationResponse.data.addUser;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <Link to="/login">← Been here before? Log back in if you already have an account!</Link>

        <h3>Signup</h3>
        <form className="col s12" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input name="username" type="text" id="username" onChange={handleChange} />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field col s12">
              <input name="email" type="email" id="email" onChange={handleChange} />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="input-field col s12">
              <input name="password" type="password" id="pwd" onChange={handleChange} />
              <label htmlFor="pwd">Password</label>
            </div>
          </div>
          <div className="flex-row flex-end">
            <button className="btn waves-effect waves-light" type="submit" name="action">
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
