import axios from 'axios';

const dbUrl = 'https://lightning-yoga-api.herokuapp.com/';

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

export { getRandomFlow, getSpecificFlow, getAllPoses };
