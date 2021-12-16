import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import styled from 'styled-components';
import { signInUser, signOutUser } from '../api/auth';
import Routes from '../routes';
import NavButtonGroup from '../components/NavButtonGroup';
import { createUserObj, checkUserExists } from '../api/data/userData';

const DivStyle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const SignInOutButtonDivStyle = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ImgDivStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 300px;
  margin-right: 300px;
`;

const ButtonStyle = styled.button`
  background-color: white,
  color: black;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  margin: 10px;
  border: 0px solid white;
`;

function Initialize() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        checkUserExists(authed).then((response) => {
          const userObj = {
            fullName: authed.displayName,
            email: authed.email,
            uid: authed.uid,
          };
          if (userObj.uid === process.env.REACT_APP_ADMIN_UID) {
            setAdmin(userObj);
          }
          if (response === 'create user') {
            createUserObj(userObj).then((newUser) => {
              setUser(newUser);
            });
          } else {
            setUser(response);
          }
        });
      } else if (user || user === null) {
        setUser(null);
        setAdmin(null);
      }
    });
  }, []);

  return (
    <>
      <SignInOutButtonDivStyle>
        {user ? (
          <ButtonStyle
            type="button"
            onClick={() => {
              signOutUser().then(() => {
                history.push('/');
              });
            }}
          >
            Sign Out
          </ButtonStyle>
        ) : (
          <ButtonStyle type="button" onClick={signInUser}>
            Sign In
          </ButtonStyle>
        )}
      </SignInOutButtonDivStyle>
      <ImgDivStyle>
        <img
          src="https://i.ibb.co/jH7VQV3/linkedinstyle-luna-yogi-1.png"
          alt="luna yogi logo"
        />
      </ImgDivStyle>
      <DivStyle>
        <NavButtonGroup user={user} admin={admin} />
      </DivStyle>
      <Routes user={user} admin={admin} />
    </>
  );
}

export default Initialize;
