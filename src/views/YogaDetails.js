// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useParams, Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { getAllPosesFromFB, getSingleFlow } from '../api/data/yogaData';

// const DivStyle = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `;

// const CardStyle = styled.div`
//   margin: 5px;
//   border-radius: 5px;
// `;

// const getSearchItems = (searchValue, poses) => {
//   if (!searchValue) {
//     return poses;
//   }
//   const filteredPosesBySearch = poses.filter(
//     (pose) => pose.english_name.toLowerCase().includes(searchValue)
//       || pose.sanskrit_name.toLowerCase().includes(searchValue),
//   );

//   return filteredPosesBySearch;
// };

// export default function YogaDetails({ admin }) {
//   const [flow, setFlow] = useState({});
//   const [poses, setPoses] = useState([]);
//   const [searchValue, setSearchValue] = useState('');
//   const [formInput, setFormInput] = useState({});
//   const { flowKey } = useParams();
//   const searchTerms = getSearchItems(searchValue, poses);

//   const handleChecked = (e) => {
//     const { name, checked } = e.target;
//     setFormInput((prevState) => ({
//       ...prevState,
//       [name]: checked,
//     }));
//     console.warn(formInput);
//     if (e.target.checked === true) {
//       // const poseId = parseInt(e.target.id);
//       // eslint-disable-next-line radix
//       const checkedPose = poses.find((pose) => pose.id === parseInt(e.target.id));
//       // chosenPoses.push(checkedPose);
//       console.warn(checkedPose);
//     }
//     // console.warn(chosenPoses);
//   };

//   useEffect(() => {
//     let isMounted = true;
//     if (isMounted) {
//       getSingleFlow(flowKey).then(setFlow);
//     }
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     let isMounted = true;
//     getAllPosesFromFB().then((poseArray) => {
//       if (isMounted) setPoses(poseArray);
//     });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <>
//       {admin ? <Link to="/addpose">Add Pose</Link> : ''}
//       <div className="input-group rounded" style={{ width: '20rem' }}>
//         <span className="input-group-text border-0" id="search-addon">
//           <i className="fas fa-search" />
//         </span>
//         <input
//           type="text"
//           className="form-control rounded"
//           placeholder="Search Poses"
//           aria-label="Search Poses"
//           aria-describedby="search-poses"
//           onChange={(e) => {
//             setSearchValue(e.target.value);
//           }}
//         />
//       </div>
//       {flow ? (
//         <h1>{flow.name}</h1>
//       ) : (
//         ''
//       )}
//       {searchTerms ? (
//         <DivStyle>
//           {searchTerms.map((term) => (
//             // <PoseCard
//             //   key={term.id}
//             //   pose={term}
//             //   setPoses={setPoses}
//             //   user={user}
//             //   admin={admin}
//             // />
//             <CardStyle
//               className="card"
//               style={{ width: '18rem' }}
//               key={term.firebaseKey}
//             >
//               <img
//                 className="card-img-top"
//                 src={term.img_url}
//                 alt={term.english_name}
//               />
//               <div className="card-body">
//                 <p className="card-text">
//                   {term.english_name} - {term.sanskrit_name}
//                 </p>
//               </div>
//               <div>
//                 <label htmlFor="addedToFlow">Add to Custom Flow</label>
//                 <input
//                   name="addedToFlow"
//                   type="checkbox"
//                   className="form-check-input"
//                   id={term.id}
//                   checked={term.addedToFlow}
//                   onChange={handleChecked}
//                 />
//               </div>
//             </CardStyle>
//           ))}
//         </DivStyle>
//       ) : (
//         <h2>Pose Not Found</h2>
//       )}
//     </>
//   );
// }

// YogaDetails.propTypes = {
//   admin: PropTypes.shape(PropTypes.obj),
// };

// YogaDetails.defaultProps = {
//   admin: null,
// };
