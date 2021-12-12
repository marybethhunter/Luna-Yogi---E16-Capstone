// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// const CardStyle = styled.div`
//   margin: 5px;
//   border-radius: 5px;
// `;

// export default function PoseCard({ pose, user, setPoses }) {
//   const [formInput, setFormInput] = useState();

//   console.warn(user);
//   console.warn(setPoses);

//   const handleChecked = (e) => {
//     const { name, checked } = e.target;
//     setFormInput((prevState) => ({
//       ...prevState,
//       [name]: checked,
//     }));
//   };

//   return (
//     <div>
//       <CardStyle className="card" style={{ width: '18rem' }}>
//         <img
//           className="card-img-top"
//           src={pose.img_url}
//           alt={pose.english_name}
//         />
//         <div className="card-body">
//           <p className="card-text">
//             {pose.english_name} - {pose.sanskrit_name}
//           </p>
//         </div>
//         <div>
//           <label htmlFor="poseToAdd">Add to Custom Flow</label>
//           <input
//             name="poseToAdd"
//             type="checkbox"
//             className="form-check-input"
//             id="poseToAdd"
//             checked={formInput.addedToPose}
//             onChange={handleChecked}
//           />
//         </div>
//       </CardStyle>
//     </div>
//   );
// }

// PoseCard.propTypes = {
//   pose: PropTypes.shape({
//     sanskrit_name: PropTypes.string,
//     english_name: PropTypes.string,
//     img_url: PropTypes.string,
//     id: PropTypes.number,
//     addedToPose: PropTypes.bool,
//   }).isRequired,
//   setPoses: PropTypes.func.isRequired,
//   user: PropTypes.shape(PropTypes.obj),
// };

// PoseCard.defaultProps = {
//   user: null,
// };
