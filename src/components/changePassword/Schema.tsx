import * as yup from 'yup';

export default yup.object().shape({
  oldPasswd: yup.string().required().label('Old Password'),
  passwd: yup.string().required().min(6).max(15).label('Password'),
  confirmPasswd: yup
    .string()
    .required()
    .oneOf([yup.ref('passwd'), ''], 'Passwords must match')
    .label('Confirm Password'),
});
