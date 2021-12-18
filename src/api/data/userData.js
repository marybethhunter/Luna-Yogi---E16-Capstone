import axios from 'axios';
import firebaseConfig from '../apiKeys';
import { getPosesByFlowId } from './yogaData';

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

const getMostRecentFlow = (uid) => new Promise((resolve, reject) => {
  getFlowByUid(uid)
    .then((allFlows) => {
      const newestFlow = allFlows.reduce((a, b) => (a.dateCreated > b.dateCreated ? a : b));
      resolve(newestFlow);
    })
    .catch(reject);
});

const getBlogsByUid = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/userJoinBlogPosts.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const deleteSavedMeditation = (meditationId, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/meditations/${meditationId}.json`)
    .then(() => getMeditationByUid(uid).then(resolve))
    .catch(reject);
});

const deleteSavedAffirmation = (mantraId, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/mantras/${mantraId}.json`)
    .then(() => getMantraByUid(uid).then(resolve))
    .catch(reject);
});

const deleteSavedBlogs = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/userJoinBlogPosts/${firebaseKey}.json`)
    .then(() => getBlogsByUid(uid).then(resolve))
    .catch(reject);
});

const deletePose = (poseId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/poses/${poseId}.json`).then(resolve).catch(reject);
});

const deleteFlow = (flowId, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/flows/${flowId}.json`)
    .then(() => getBlogsByUid(uid).then(resolve))
    .catch(reject);
});

const deleteSavedFlowsandPoses = async (flowId, uid) => {
  const flowPoses = await getPosesByFlowId(flowId);
  const deletePosePromises = [];
  flowPoses.forEach((pose) => {
    deletePosePromises.push(deletePose(pose.poseId));
  });
  Promise.all(deletePosePromises).then(deleteFlow(flowId, uid));
};

export {
  createUserObj,
  checkUserExists,
  getMeditationByUid,
  getMantraByUid,
  getFlowByUid,
  getMostRecentFlow,
  getBlogsByUid,
  deleteSavedMeditation,
  deleteSavedAffirmation,
  deleteSavedBlogs,
  deleteSavedFlowsandPoses,
};
