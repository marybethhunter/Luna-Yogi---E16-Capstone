import axios from 'axios';
import firebaseConfig from '../apiKeys';

const fbUrl = firebaseConfig.databaseURL;

const config = {
  method: 'get',
  url: 'https://www.affirmations.dev/',
  headers: {},
};

const getAffirmation = () => new Promise((resolve, reject) => {
  axios(config)
    .then((response) => resolve(response.data))
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

export { getAffirmation, addMantraToDB };
