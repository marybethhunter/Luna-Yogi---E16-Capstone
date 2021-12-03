import axios from 'axios';
import firebase from 'firebase/app';
import { firebaseConfig } from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getCurrentUsersUid = () => firebase.auth().currentUser?.uid;

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      let currentUserInfo = Object.values(response.data);
      currentUserInfo = currentUserInfo.shift();
      const firebaseKey = Object.keys(response.data)[0];
      resolve({ ...currentUserInfo, firebaseKey });
    })
    .catch(reject);
  // const currentUserInfo = { uid };
  // resolve(currentUserInfo);
});

export { getCurrentUsersUid, getUserByUid };
