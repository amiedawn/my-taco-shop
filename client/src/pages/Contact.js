import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { validateEmail } from '../utils/helpers';
import { SEND_CONTACT_EMAIL } from '../utils/mutations';

function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [response, setResponse] = useState('');
  const { name, email, message } = formState;
  const [sendContactEmail] = useMutation(SEND_CONTACT_EMAIL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage) {
      return;
    }

    const { data } = await sendContactEmail({ variables: formState });
    setResponse(data.sendContactEmail);
    setResponse('Thank you for your message! We will respond to you as quickly as possible.');
  };

  // error messages if nothing is entered in input boxes
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setErrorMessage('Your email is invalid.');
        return;
      }
    } else if (!e.target.value.length) {
      setErrorMessage(`${e.target.name} is required.`);
      return;
    }
    setFormState((state) => ({ ...state, [e.target.name]: e.target.value }));
    setErrorMessage('');
  };

  return (
    <div className="container">
      <div className="row">
        <h3>Contact Us</h3>
        <form className="col s12" id="contact-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input name="name" type="text" defaultValue={name} onChange={handleChange} />
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-field col s12">
              <input type="email" name="email" defaultValue={email} onChange={handleChange} />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="input-field col s12">
              <textarea
                className="materialize-textarea"
                name="message"
                defaultValue={message}
                onChange={handleChange}
              />
              <label htmlFor="message">Message</label>
            </div>
          </div>
          {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )}
          {response && (
            <div>
              <p className="">{response}</p>
            </div>
          )}
          <div className="flex-row flex-end">
            <button className="btn waves-effect waves-light" type="submit" name="action">
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
      {/* section for address and contact info */}
      <div className="row">
        <section>
          <div>
            <h3>Taco 'Bout It</h3>
            <p>
              55 Main Street <br />
              Some Town, UT 12345 <br />
              Phone Number: 555-786-2839
              <br />
              Email Address: <a href="fstacoshop@gmail.com">fstacoshop@gmail.com</a>
            </p>
            <p>
              Hours of Operation: <br />
              Monday-Friday 11:00 AM - 10:00 PM <br />
              Saturday-Sunday 10:30 AM - 12:00 AM
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
