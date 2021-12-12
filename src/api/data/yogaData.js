import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = 'https://lightning-yoga-api.herokuapp.com/';
const fbUrl = firebaseConfig.databaseURL;

// lightning yoga api
const getRandomFlow = (numBt1and12) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/yoga_categories/${numBt1and12}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getSpecificFlow = (categoryId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/yoga_categories/${categoryId}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getAllPoses = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/yoga_poses`)
    .then((response) => {
      let poseObj = Object.values(response.data);
      poseObj = poseObj.shift();
      resolve(poseObj);
    })
    .catch(reject);
});

const getSingleFlow = (flowId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/flows/${flowId}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// firebase
const getAllPosesFromFB = () => new Promise((resolve, reject) => {
  axios
    .get(`${fbUrl}/poses.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getSingleFlowfromFB = (flowId) => new Promise((resolve, reject) => {
  axios
    .get(`${fbUrl}/flows/${flowId}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getUserFlows = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${fbUrl}/flows/.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addFlowToDB = (flowObj) => new Promise((resolve, reject) => {
  axios
    .post(`${fbUrl}/flows.json`, flowObj)
    .then((response) => {
      const flowId = response.data.name;
      axios.patch(`${fbUrl}/flows/${flowId}.json`, { flowId }).then(resolve);
    })
    .catch(reject);
});

const addCustomFlowToDB = (flowObj) => new Promise((resolve, reject) => {
  axios
    .post(`${fbUrl}/flows.json`, flowObj)
    .then((response) => {
      const flowId = response.data.name;
      axios.patch(`${fbUrl}/flows/${flowId}.json`, { flowId }).then(resolve);
    })
    .catch(reject);
});

const addPoseToDB = (poseObj) => new Promise((resolve, reject) => {
  axios
    .post(`${fbUrl}/poses.json`, poseObj)
    .then((response) => {
      const poseId = response.data.name;
      axios.patch(`${fbUrl}/poses/${poseId}.json`, { poseId }).then(resolve);
    })
    .catch(reject);
});

export {
  getRandomFlow,
  getSpecificFlow,
  getAllPoses,
  addPoseToDB,
  addFlowToDB,
  getAllPosesFromFB,
  getSingleFlow,
  addCustomFlowToDB,
  getUserFlows,
  getSingleFlowfromFB,
};
