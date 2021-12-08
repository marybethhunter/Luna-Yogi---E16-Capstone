import axios from 'axios';
import FormData from 'form-data';
// import firebaseConfig from '../apiKeys';

// const fbUrl = firebaseConfig.databaseURL;

const data = new FormData();
data.append('api_key', process.env.REACT_APP_DEEPMEDITATE_API_KEY);

const config = {
  method: 'post',
  url: 'https://deepmeditate.com/api/daily_meditation/',
  data,
};

const getDailyMeditation = () => new Promise((resolve, reject) => {
  axios(config)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// const addMeditationToDB = (medObj) => new Promise((resolve, reject) => {
//   axios.post(`${fbUrl}/meditations.json`, medObj)
//     .then((response) => {
//       const meditationId = response.data.name;
//       axios.patch(`${fbUrl}/meditations/${meditationId}.json`, { meditationId })
//         .then(resolve);
//     }).catch(reject);
// });

export default getDailyMeditation;
