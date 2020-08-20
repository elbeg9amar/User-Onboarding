import * as yup from 'yup'



const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email address.")
      .required("Must include email address."),
    username: yup
      .string()
      .min(3, "Username must be at least 3 characters long.")
      .required("Username is Required"),
    role: yup
      .string()
      .oneOf(['student','tl', 'alumni','instructor'], "You must select one"),
    civil: yup
      .string()
      .oneOf(['single', 'married'], 'You must select a civil status')
      .required('You must select a civil status')
     
  });

  export default formSchema