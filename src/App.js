import React, { useState, useEffect } from 'react';
import * as API from './components/services/users-api';
import styles from './App.module.css';
import AddNewUser from './components/addNewUser';
import Message from './components/Message';

function App() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [errorGetUsers, setErrorGetUsers] = useState('');
  const [errAddUser, setErrAddUser] = useState('');

  //get all users
  useEffect(() => {
    API.getAllUsers()
      .then(data => {
        return data.data;
      })
      .then(data => setUsers(data))
      .catch(error => setErrorGetUsers(error.message));
  }, [newUser, errAddUser]);

  const openModal = () => {
    setShowModal(true);
    setErrAddUser('');
    setNewUser(null);
  };

  const closeModal = () => setShowModal(false);

  const showNewUser = result => {
    setNewUser(result);
  };

  const errorOnAddUserFunc = result => {
    setErrAddUser(result);
  };

  return (
    <main>
      <section className={styles.container}>
        <h1 className={styles.title}>Our Users</h1>
        {newUser && <Message onRender={newUser} onError={errAddUser} />}
        {errorGetUsers && (
          <p className={styles.error}>Sorry... Try again later...</p>
        )}
        <button type="button" className={styles.add} onClick={openModal}>
          Join
        </button>
        <ul className={styles.usersList}>
          {users.map(({ id, title, firstName, lastName, picture }) => (
            <li className={styles.listItem} key={id}>
              <div className={styles.thumb}>
                <img src={picture} alt={lastName} />
              </div>
              <h2 className={styles.userName}>
                {title} {firstName} {lastName}
              </h2>
            </li>
          ))}
        </ul>
      </section>
      {showModal && (
        <AddNewUser
          onClose={closeModal}
          onShow={showNewUser}
          onError={errorOnAddUserFunc}
        />
      )}
    </main>
  );
}

export default App;
