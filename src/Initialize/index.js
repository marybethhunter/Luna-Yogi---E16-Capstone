import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { signInUser, signOutUser } from '../api/auth';
import Routes from '../routes';
import NavButtonGroup from '../components/NavButtonGroup';

function Initialize() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userObj = {
          fullName: authed.displayName,
          email: authed.email,
          uid: authed.uid,
          isAdmin: process.env.REACT_APP_ADMIN_UID === authed.uid,
        };
        setUser(userObj);
      }
    });
  }, []);

  return (
    // have logo/header and button group here and then the footer below
    <>
      <button type="button" onClick={signInUser}>
        sign in
      </button>
      <button
        type="button"
        onClick={() => {
          signOutUser().then(() => {
            history.push('/');
          });
        }}
      >
        sign out
      </button>
      <NavButtonGroup />
      <Routes user={user} />
    </>
  );
}

export default Initialize;
