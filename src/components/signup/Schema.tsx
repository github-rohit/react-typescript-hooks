import * as yup from 'yup';

export default yup.object().shape({
  email: yup.string().required().email().min(6).max(50).label('Email'),
  name: yup.string().min(3).max(25).required().label('Name'),
  passwd: yup.string().required().min(6).max(15).label('Password'),
  confirmPasswd: yup
    .string()
    .oneOf([yup.ref('passwd'), ''], 'Passwords must match'),
});
