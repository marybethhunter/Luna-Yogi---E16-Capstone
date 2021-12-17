import axios from 'axios';
import firebaseConfig from '../apiKeys';

const fbUrl = firebaseConfig.databaseURL;

const getDailyMeditation = () => new Promise((resolve, reject) => {
  axios
    .get(`${fbUrl}/mbmeditations.json`)
    .then((response) => {
      const values = Object.values(response.data);
      const random = Math.floor(Math.random() * values.length);
      resolve({ meditation: values[random] });
    })
    .catch(reject);
});

const addMeditationToDB = (medObj) => new Promise((resolve, reject) => {
  getDailyMeditation().then(() => {
    axios
      .post(`${fbUrl}/meditations.json`, medObj)
      .then((response) => {
        const meditationId = response.data.name;
        axios
          .patch(`${fbUrl}/meditations/${meditationId}.json`, {
            meditationId,
          })
          .then(resolve);
      })
      .catch(reject);
  });
});

const addMedToDB = (medObj) => new Promise((resolve, reject) => {
  axios
    .post(`${fbUrl}/mbmeditations.json`, medObj)
    .then((response) => {
      const meditationId = response.data.name;
      axios
        .patch(`${fbUrl}/mbmeditations/${meditationId}.json`, {
          meditationId,
        })
        .then(resolve);
    })
    .catch(reject);
});

export { getDailyMeditation, addMeditationToDB, addMedToDB };
