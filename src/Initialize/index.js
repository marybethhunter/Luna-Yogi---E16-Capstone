import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { signInUser, signOutUser } from '../api/auth';

function Initialize() {
  const [user, setUser] = useState(null);

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
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    // have logo/header and button group here and then the footer below
    <>
      <button type="button" onClick={signInUser}>
        sign in
      </button>
      <button type="button" onClick={signOutUser}>
        sign out
      </button>
    </>
  );
}

export default Initialize;
