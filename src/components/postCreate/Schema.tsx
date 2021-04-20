import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required().min(5).label('Title'),
  description: yup.string().required().label('Description'),
});
