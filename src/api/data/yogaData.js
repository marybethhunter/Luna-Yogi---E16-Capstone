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

const getPosesFromCategory = (catShortName) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/yoga_poses?yoga_category_short_name=${catShortName}`)
    .then((response) => {
      let poseObj = Object.values(response.data);
      poseObj = poseObj.shift();
      resolve(poseObj);
    })
    .catch(reject);
});

// firebase
const getAllPosesFromFB = () => new Promise((resolve, reject) => {
  axios
    .get(`${fbUrl}/poses.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const addFlowToDB = (flowObj) => new Promise((resolve, reject) => {
  axios
    .post(`${fbUrl}/flows.json`, flowObj)
    .then((response) => {
      const flowId = response.data.name;
      axios.patch(`${fbUrl}/flows/${flowId}.json`, { flowId }).then(() => {
        resolve(flowId);
      });
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

const getFlowId = (flowId) => new Promise((resolve, reject) => {
  axios
    .get(`${fbUrl}/flows.json?orderBy="flowId"&equalTo="${flowId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const getPosesByFlowId = (flowId) => new Promise((resolve, reject) => {
  axios
    .get(`${fbUrl}/poses.json?orderBy="flowId"&equalTo="${flowId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export {
  getRandomFlow,
  getAllPoses,
  addPoseToDB,
  addFlowToDB,
  addCustomFlowToDB,
  getAllPosesFromFB,
  getFlowId,
  getPosesByFlowId,
  getPosesFromCategory,
};
