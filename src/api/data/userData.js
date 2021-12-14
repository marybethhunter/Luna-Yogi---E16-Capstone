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

const getMeditationByUid = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/meditations.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getMantraByUid = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/mantras.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getFlowByUid = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/flows.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getUserFlows = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/flows/.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getMostRecentFlow = (uid) => new Promise((resolve, reject) => {
  getUserFlows(uid)
    .then((allFlows) => {
      const newestFlow = allFlows.reduce((a, b) => (a.dateCreated > b.dateCreated ? a : b));
      resolve(newestFlow);
    })
    .catch(reject);
});

const addBlogFBKey = (blogId, uid) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/userJoinBlogPosts.json`, blogId)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(
          `${dbUrl}/userJoinBlogPosts/${firebaseKey}.json`,
          { firebaseKey },
          uid,
          blogId,
        )
        .then(resolve);
    })
    .catch(reject);
});

const getBlogsByUid = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/blog.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export {
  createUserObj,
  filterByUid,
  checkUserExists,
  getMeditationByUid,
  getMantraByUid,
  getFlowByUid,
  getMostRecentFlow,
  getUserFlows,
  addBlogFBKey,
  getBlogsByUid,
};
