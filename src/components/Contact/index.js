import React, { useState } from "react";
import { validateEmail } from "../../assets/utils/helpers";

function ContactForm() {
  // JSX
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { name, email, message } = formState;
  const [errorMessage, setErrorMessage] = useState("");

  //   Below Syncs the state. In input, onChange event listener will fire the handleChange
  //  function whenever a keystroke is typed into the input field.
  // Uses spread operator(...formState) so we can retain the other key-value pairs in
  // this object. Without the spread operator, the formState
  // object would be overwritten to only contain the name: value key pair.

  function handleChange(e) {
    // validates email with imported function
    if (e.target.name === "email") {
      const isValid = validateEmail(e.target.value);
      console.log(isValid);
      // isValid conditional statement
      if (!isValid) {
        setErrorMessage("Your email is invalid.");
      } else {
        setErrorMessage("");
      }
    } else {
      if (!e.target.value.length) {
        setErrorMessage(`${e.target.name} is required.`);
      } else {
        setErrorMessage("");
      }
    }
    //   logs the error messages on keystrokes
    //   console.log('errorMessage', errorMessage);

    //   setFormState only updates if the form data has passed the validations
    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  }

  // handles submission of data from the form element
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState);
  }

  //   checks console for sync
  //   console.log(formState);

  return (
    <section>
      <h1>Contact me</h1>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            defaultValue={name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            defaultValue={email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            defaultValue={message}
            onChange={handleChange}
            rows="5"
          />
        </div>
        {/* Renders error message in the UI if errorMessage contains an error */}
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default ContactForm;
