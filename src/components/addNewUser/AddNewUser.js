import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as API from '../services/users-api';

import styles from './addNewUser.module.css';

const modalRoot = document.querySelector('#modal-root');

// This component create modal window with form to create a new user.
// Form has 3 required fields: first name, last name and email.
//First name and last name are validated by the length of the string.
// Email is validated with a regular expression.
// Url for picture is also validated with a regular expression. This field is optional

function AddNewUser({ onClose, onShow, onError }) {
  // states for form
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  const [err, setErr] = useState('');

  // states for validation
  const [firstNameIsOnFocus, setFirstNameIsOnFocus] = useState(false);
  const [lastNameIsOnFocus, setLastNameIsOnFocus] = useState(false);
  const [emailIsOnFocus, setEmailIsOnFocus] = useState(false);
  const [pictureIsOnFocus, setPictureIsOnFocus] = useState(false);

  const [firstNameErr, setFirstNameErr] = useState('Required field');
  const [lastNameErr, setLastNameErr] = useState('Required field');
  const [emailErr, setEmailErr] = useState('Required field');
  const [pictureErr, setPictureErr] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  //sets the values of form-fields, validating them
  const changeInput = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'title':
        setTitle(value);
        break;

      case 'firstName':
        setFirstName(value);
        value.length < 2 || value.length > 50
          ? setFirstNameErr('Name must be 2-50 characters long')
          : setFirstNameErr('');
        break;

      case 'lastName':
        setLastName(value);
        value.length < 2 || value.length > 50
          ? setLastNameErr('Name must be 2-50 characters long')
          : setLastNameErr('');
        break;

      case 'email':
        setEmail(value);
        const regExp =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        !regExp.test(String(value).toLowerCase())
          ? setEmailErr('Uncorrect email')
          : setEmailErr('');
        break;

      case 'picture':
        setPicture(value);
        const re =
          /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
        !re.test(String(value).toLowerCase())
          ? setPictureErr(
              'Uncorrect URL. Please, use another url or live this field empty.',
            )
          : setPictureErr('');
        break;

      default:
        return console.log('err');
    }
  };
  // the function is created to output validation errors after defocusing on input
  const blurHandler = e => {
    switch (e.target.name) {
      case 'firstName':
        setFirstNameIsOnFocus(true);
        break;

      case 'lastName':
        setLastNameIsOnFocus(true);
        break;

      case 'email':
        setEmailIsOnFocus(true);
        break;

      case 'picture':
        setPictureIsOnFocus(true);
        break;

      default:
        return console.log('err');
    }
  };

  //check if form valid or not. If the form is valid, the button to confirm becomes available
  useEffect(() => {
    firstNameErr || lastNameErr || emailErr || pictureErr
      ? setIsFormValid(false)
      : setIsFormValid(true);
  }, [firstNameErr, lastNameErr, emailErr, pictureErr]);

  //Submit and reset form by click on confirm button
  const onSubmit = async e => {
    e.preventDefault();
    let newUser = { firstName, lastName, email, picture };
    if (title.length > 0) {
      newUser = { title, firstName, lastName, email, picture };
    }
    await API.postUser(newUser)
      .then(onShow(newUser))
      .catch(error => {
        setErr(error.message);
        onError(error.message);
      });
    reset();
    onClose();
  };

  const reset = () => {
    setTitle('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPicture('');
  };

  // Close form(modal) by 'escape' & click on backdrop
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.58942 10.3673L14.5317 16.3897C15.0965 16.9621 16.0116 16.9618 16.5764 16.3894C17.1411 15.817 17.1411 14.8891 16.5764 14.3168L10.6344 8.29466L16.1715 2.68285C16.7363 2.11047 16.7363 1.18263 16.1712 0.610595C15.6064 0.0382107 14.691 0.0382107 14.1262 0.610595L8.58942 6.22205L2.87377 0.429288C2.309 -0.143096 1.39352 -0.143096 0.828755 0.429288C0.263991 1.00167 0.26399 1.92951 0.828755 2.50189L6.54441 8.29466L0.423573 14.4981C-0.141191 15.0705 -0.141191 15.9983 0.423574 16.5707C0.988338 17.1431 1.90382 17.1431 2.46859 16.5707L8.58942 10.3673Z"
              fill="white"
            />
          </svg>
        </button>
        <form autoComplete="off" onSubmit={onSubmit} className={styles.form}>
          <label className={styles.field}>
            <select
              name="title"
              value={title}
              onChange={changeInput}
              className={styles.input}
            >
              <option value="">Choose status</option>
              <option value="mr">MR</option>
              <option value="mrs">MRS</option>
              <option value="miss">Miss</option>
              <option value="dr">Dr</option>
              <option value="ms">MS</option>
            </select>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>First Name</span>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onBlur={blurHandler}
              onChange={changeInput}
              className={styles.input}
            />
            {firstNameIsOnFocus && firstNameErr && (
              <p className={styles.error}>{firstNameErr}</p>
            )}
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Last Name</span>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onBlur={blurHandler}
              onChange={changeInput}
              className={styles.input}
            />
            {lastNameIsOnFocus && lastNameErr && (
              <p className={styles.error}>{lastNameErr}</p>
            )}
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onBlur={blurHandler}
              onChange={changeInput}
              className={styles.input}
            />
            {emailIsOnFocus && emailErr && (
              <p className={styles.error}>{emailErr}</p>
            )}
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Avatar</span>
            <input
              type="url"
              name="picture"
              placeholder="URL http://..."
              value={picture}
              onBlur={blurHandler}
              onChange={changeInput}
              className={styles.input}
            />
            {pictureIsOnFocus && pictureErr && (
              <p className={styles.error}>{pictureErr}</p>
            )}
          </label>
          <button
            disabled={!isFormValid}
            type="submit"
            className={styles.confirm}
          >
            Add
          </button>
        </form>
        {err && <p className={styles.error}>Sorry... Try again later...</p>}
      </div>
    </div>,
    modalRoot,
  );
}
export default AddNewUser;
