import React, {useState,useEffect} from 'react';
import axios from 'axios'
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

function App() {
  const [friends,  setFriends] = useState([])
  
  const [formValues,setFormValue] = useState(initialFormValues)


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
    setFormValue({...formValues,[inputName]:inputValue})
  }

  const submitForm =() => {
    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
      civil: formValues.civil,
      hobbies:Object.keys(formValues.hobbies).filter(hob => formValues.hobbies[hob]),
    }
    if (!newFriend.username || !newFriend.email) return

    postNewFriend(newFriend)

    
  }
  
  return (
    <div className='container'>
        <header><h1>Friend App</h1></header>

        <Form 
        
        values={formValues}
        update={ updateForm } 
        submit={submitForm}
        onboxChange={checkboxChange}
        
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
