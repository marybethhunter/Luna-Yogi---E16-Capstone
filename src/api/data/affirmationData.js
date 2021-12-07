import axios from 'axios';

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

export default getAffirmation;
