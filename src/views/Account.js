// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import AccountDetails from '../components/AccountDetails';
// import { getUserByUid } from '../api/data/userData';

// export default function Account({ user }) {
//   const { uid } = useParams();

//   useEffect(() => {
//     let isMounted = true;
//     if (isMounted) {
//       getUserByUid(uid).then(setEditItem);
//     }
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <>
//       <AccountDetails user={user} />
//     </>
//   );
// }

// Account.propTypes = {
//   user: PropTypes.shape(PropTypes.obj),
// };

// Account.defaultProps = {
//   user: null,
// };
