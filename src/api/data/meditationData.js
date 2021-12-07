import axios from 'axios';
import FormData from 'form-data';

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

export default getDailyMeditation;
