import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { signInUser, signOutUser } from '../api/auth';
import Routes from '../routes';
import NavButtonGroup from '../components/NavButtonGroup';
import { createUserObj, checkUserExists } from '../api/data/userData';

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
    // have logo/header and button group here and then the footer below
    <>
      <NavButtonGroup user={user} admin={admin} />
      {user ? (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            signOutUser().then(() => {
              history.push('/');
            });
          }}
        >
          sign out
        </button>
      ) : (
        <button type="button" className="btn btn-success" onClick={signInUser}>
          sign in
        </button>
      )}
      <Routes user={user} admin={admin} />
    </>
  );
}

export default Initialize;
