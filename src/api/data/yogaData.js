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

const getPosesByCategoryName = (categoryShortName) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/yoga_poses?yoga_category_short_name=${categoryShortName}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export { getRandomFlow, getSpecificFlow, getPosesByCategoryName };
