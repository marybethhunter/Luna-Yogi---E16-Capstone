import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

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

const filterByUid = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/users.json?orderBy="uid"&equalTo=${uid}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const checkUserExists = (user) => new Promise((resolve) => {
  axios
    .get(`${dbUrl}/users.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((response) => {
      if (Object.values(response.data).length) {
        const [foundUser] = Object.values(response.data);
        resolve({ ...foundUser });
      } else {
        resolve('create user');
      }
    });
});

// adding user's uid to the flow
// also add flow to fb
// const addFlowToUser = ()

export { createUserObj, filterByUid, checkUserExists };
