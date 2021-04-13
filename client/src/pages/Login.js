import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const { token } = mutationResponse.data.login;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
        <Link to="/signup">← Is this your first time here? Sign up to create an account first!</Link>

        <h3>Login</h3>
        <form className="col s12" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input name="email" type="email" id="email" onChange={handleChange} />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="input-field col s12">
              <input name="password" type="password" id="pwd" onChange={handleChange} />
              <label htmlFor="pwd">Password</label>
            </div>
          </div>
          {error ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
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

export default Login;
