import React, { useState, useEffect } from 'react';
import * as API from './components/services/users-api';
// import styles from './App.module.css';
import AddNewUser from './components/addNewUser';
import Message from './components/Message';
import styled from 'styled-components';

const Container = styled.section`
  padding: 0px 15px;
  margin: 50px auto;
  background-color: #ffffcc;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 50px;

  @media screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const Button = styled.button`
position: fixed;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  font-weight: 900;
  padding: 0px;
  background-color: #99ff99;
  transition-property: transform, background-color, font-size;
  transition-duration: 300ms;

  @media screen and (min-width: 768px) {
    width: 80px;
    height: 80px;
  }

  &:hover {
  transform: scale(1.05);
  background-color: #00cc66;
  font-size: 18px;  
`;

const UserList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: -5px;
  justify-content: space-around;
`;

const ListItem = styled.li`
  width: calc((100% - 4 * 10px) / 2);
  border: 1px solid #d9dce4;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 3px 10px #d9dce4;
  margin: 5px;
  padding: 10px;

  @media screen and (min-width: 768px) {
    width: calc((100% - 8 * 10px) / 4);
  }

  @media screen and (min-width: 1200px) {
    width: calc((100% - 10 * 10px) / 5);
  }
`;

const UserName = styled.h2`
  font-size: 16px;
  text-align: center;
  margin-top: auto;
  margin-bottom: 0px;
`;

const Thumb = styled.div`
  width: 70px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #000000;
  margin: 0px auto 20px;
`;

const Error = styled.p`
  color: red;
  border-bottom: red;
  font-size: 30px;
`;

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
      <Container>
        <Title>Our Users</Title>
        {newUser && <Message onRender={newUser} onError={errAddUser} />}
        {errorGetUsers && <Error>Sorry... Try again later...</Error>}
        <Button type="button" onClick={openModal}>
          Join
        </Button>
        <UserList>
          {users.map(({ id, title, firstName, lastName, picture }) => (
            <ListItem key={id}>
              <Thumb>
                <img src={picture} alt={lastName} />
              </Thumb>
              <UserName>
                {title} {firstName} {lastName}
              </UserName>
            </ListItem>
          ))}
        </UserList>
      </Container>
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
