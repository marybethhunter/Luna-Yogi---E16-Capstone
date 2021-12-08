import axios from 'axios';
import firebase from 'firebase/app';
import firebaseConfig from '../apiKeys';

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

const createUserObj = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/users.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios.patch(`${dbUrl}/users/${firebaseKey}.json`, { firebaseKey });
    })
    .then(resolve)
    .catch(reject);
});

// adding user's uid to the flow
// also add flow to fb
// const addFlowToUser = ()

export { getCurrentUsersUid, getUserByUid, createUserObj };
