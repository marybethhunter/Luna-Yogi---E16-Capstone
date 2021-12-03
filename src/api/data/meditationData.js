import axios from 'axios';
import { deepMeditate } from '../apiKeys';

const meditateKey = deepMeditate.key;

const getAMeditation = () => new Promise((resolve, reject) => {
  axios
    .post(`https://deepmeditate.com/api/daily_meditation/${meditateKey}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getDailyMeditation = () => new Promise((resolve, reject) => {
  axios({
    url: 'https://deepmeditate.com/api/daily_meditation/',
    raw_url: 'https://deepmeditate.com/api/daily_meditation/',
    method: 'post',
    data: {
      api_key: `${meditateKey}`,
    },
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

// {
//   "url": "https://deepmeditate.com/api/daily_meditation",
//   "raw_url": "https://deepmeditate.com/api/daily_meditation/",
//   "method": "post",
//   "data": {
//       "api_key": "\"1M9HH13MCK1F3I1H0QWTDYO3J918WGOL110\""
//   }
// }

// async function getDailyMeditation() {
//   try {
//     const b = await axios.post('https://deepmeditate.com/api/daily_meditation/',
//       params: {
//         api_key = meditateKey,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// }

export { getDailyMeditation, getAMeditation };
