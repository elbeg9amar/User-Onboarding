import React, {useState,useEffect} from 'react';
import axios from 'axios'
import * as yup from 'yup'
import formSchema from './validation/formSchema'
import './App.css';
import Form from './Form'
import Friend from './Friend'



const initialFormValues = {
  username: '',
  email:'',
  role:'',
  civil:'',
  hobbies:{
    hiking:false,
    reading:false,
    coding:false,
  }
}
const initialFormErrors = {
  username: '',
  email: '',
  role: '',
  civil: '',
}

const initialDisabled = true

function App() {
  const [friends,  setFriends] = useState([])
  
  const [formValues,setFormValue] = useState(initialFormValues)

  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const [disabled, setDisabled] = useState(initialDisabled)

  const [user, setUser]=useState([])


  const postNewFriend = newFriend => {
    axios.post('https://reqres.in/api/users',newFriend)
    .then(res => {
      setFriends([...friends,res.data])
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
    .finally( () => {
      setFormValue(initialFormValues)
    })
  }

  const checkboxChange = (name,isChecked) => {
    setFormValue({
      ...formValues,hobbies: {
        ...formValues.hobbies,
        [name]: isChecked
      }
    })
  }
  const updateForm =(inputName, inputValue) => {

    yup
    .reach(formSchema, inputName)
    
    .validate(inputValue)
    
    .then(valid => {
      setFormErrors({
        ...formErrors,
        [inputName]: ""
      });
    })
    
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [inputName]: err.errors[0]
      });
    });
    setFormValue({
    ...formValues,
    [inputName]: inputValue
    });
};
  

  const submitForm =() => {
    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
      civil: formValues.civil,
      hobbies:Object.keys(formValues.hobbies).filter(hob => formValues.hobbies[hob]),
    }
    
    setUser(...user,newFriend)
    postNewFriend(newFriend)

    
  }
 

  useEffect( () => {
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      })
  },[formValues])
  
  return (
    <div className='container'>
        <header><h1>Friend App</h1></header>
        <pre>{JSON.stringify(user)}</pre>
        <Form 
        
        values={formValues}
        update={ updateForm } 
        submit={submitForm}
        onboxChange={checkboxChange}
        disabled={disabled}
        errors={formErrors}
        
        />
      {
        friends.map(friend => {
            
              return <Friend detail={friend}/>
            
        })
      }
        





    </div>



  )
}

export default App;
