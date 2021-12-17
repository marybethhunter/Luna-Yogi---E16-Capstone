import axios from 'axios';
import firebaseConfig from '../apiKeys';

const fbUrl = firebaseConfig.databaseURL;

const getAffirmation = () => new Promise((resolve, reject) => {
  axios
    .get(`${fbUrl}/affirmations.json`)
    .then((response) => {
      const values = Object.values(response.data);
      const random = Math.floor(Math.random() * values.length);
      resolve({ affirmation: values[random] });
    })
    .catch(reject);
});

const addMantraToDB = (mantraObj) => new Promise((resolve, reject) => {
  getAffirmation().then(() => {
    axios
      .post(`${fbUrl}/mantras.json`, mantraObj)
      .then((response) => {
        const mantraId = response.data.name;
        axios
          .patch(`${fbUrl}/mantras/${mantraId}.json`, { mantraId })
          .then(resolve);
      })
      .catch(reject);
  });
});

const addAffToDB = (affirmObj) => new Promise((resolve, reject) => {
  axios
    .post(`${fbUrl}/affirmations.json`, affirmObj)
    .then((response) => {
      const affirmId = response.data.name;
      axios
        .patch(`${fbUrl}/affirmations/${affirmId}.json`, { affirmId })
        .then(resolve);
    })
    .catch(reject);
});

export { getAffirmation, addMantraToDB, addAffToDB };
