import axios from 'axios';

// const getAffirmation = () => new Promise((resolve, reject) => {
//   axios
//     .get('https://www.affirmations.dev/')
//     .then((response) => resolve(response.data))
//     .catch(reject);
// });

const getAffirmation = async () => {
  const affirmationCall = await axios.get('https://www.affirmations.dev/');
  return affirmationCall.data;
};

export default getAffirmation;
