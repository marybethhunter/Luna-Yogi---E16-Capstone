import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getAllPosts = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/blog.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const deletePost = (postId) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/blog/${postId}.json`)
    .then(() => getAllPosts().then(resolve))
    .catch(reject);
});

const addNewPost = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/blog.json`, obj)
    .then((response) => {
      const postId = response.data.name;
      axios.patch(`${dbUrl}/blog/${postId}.json`, { postId }).then(() => {
        getAllPosts().then(resolve);
      });
    })
    .catch(reject);
});

const updatePost = (postId, obj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/blog/${postId}.json`, obj)
    .then(() => getAllPosts().then(resolve))
    .catch(reject);
});

const getSinglePost = (postId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/blog/${postId}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const copyBlogToUser = (postId, postObj) => new Promise((resolve, reject) => {
  getSinglePost(postId)
    .then(() => {
      axios
        .post(`${dbUrl}/userJoinBlogPosts.json`, postObj)
        .then((response) => {
          const firebaseKey = response.data.name;
          axios
            .patch(`${dbUrl}/userJoinBlogPosts/${firebaseKey}.json`, {
              firebaseKey,
            })
            .then(resolve);
        });
    })
    .catch(reject);
});

export {
  getAllPosts,
  deletePost,
  addNewPost,
  updatePost,
  getSinglePost,
  copyBlogToUser,
};
