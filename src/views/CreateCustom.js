// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
// import {
//   Button, Form, FormGroup, Label, Input,
// } from 'reactstrap';
// import { addFlowToDB } from '../api/data/yogaData';

// const initialState = {
//   name: '',
// };

// export default function CreateCustom({ user, obj = {} }) {
//   const history = useHistory();
//   const [formInput, setFormInput] = useState(initialState);

//   const handleChange = (e) => {
//     setFormInput((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleClick = (e) => {
//     e.preventDefault();
//     addFlowToDB({ ...formInput, userId: user.uid }).then(() => {
//       history.push(`/flows/${obj.flowId}`);
//     });
//   };

//   useEffect(() => {
//     if (obj.flowId) {
//       setFormInput({
//         name: obj.name,
//       });
//     }
//   }, [obj]);

//   return (
//     <div>
//       <Form onSubmit={handleClick} style={{ width: '18rem' }}>
//         <FormGroup>
//           <Label for="logo">Flow Name:</Label>
//           <Input
//             onChange={(e) => handleChange(e)}
//             value={formInput.name || ''}
//             type="text"
//             name="name"
//             id="name"
//             placeholder="Name your flow!"
//           />
//         </FormGroup>
//         <Button>Create Flow</Button>
//       </Form>
//     </div>
//   );
// }

// CreateCustom.propTypes = {
//   obj: PropTypes.shape({}),
//   user: PropTypes.shape(PropTypes.obj),
// };

// CreateCustom.defaultProps = {
//   obj: {},
//   user: null,
// };
