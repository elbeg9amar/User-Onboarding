import React from 'react'


export default function Form(props) {
    const {values, update,submit,onboxChange,disabled, errors } = props

    const onChange = evt => {
        const {name, value} = evt.target
       update(name, value)
    }

    const onCheckboxChange = evt => {
        const { name, checked } = evt.target
        onboxChange(name, checked)
      }

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    return (
        <form className='form div' onSubmit={onSubmit}> 
            <div>
                <h2>Add a friend</h2>
            </div>
            <div>
                <h4>General information</h4>
                <div>
                <div className='errors'>
                    <div>{errors.username}</div>
                    <div>{errors.email}</div>
                    <div>{errors.role}</div>
                    <div>{errors.civil}</div>
                </div>
                <button disabled={disabled}
                 >Done
                 </button>
                </div>

                <label>Username:&nbsp;
                    <input
                        value={values.username}
                        onChange={onChange}
                        name='username'
                        placeholder='type yourname'
                        maxLength='20'
                        type="text"
                    />            
                </label>

                <label>Email:&nbsp;
                    <input
                    value={values.email}
                    onChange={onChange}
                    name='email'
                    placeholder='type email'
                    maxLength='30'
                    type='email'
                    />
                </label>

                <label>Role:&nbsp;
                    <select value={values.role} onChange={onChange}name='role'>
                        <option value="">-- Select a Role --</option>
                        <option value="student">Student</option>
                        <option value="tl">Team Lead</option>
                        <option value="alumni" >Alumni</option>
                        <option value="boss">Boss</option>
                    </select>
                </label>
                <label>Single
                    <input 
                     type="radio"
                     name='civil'
                     value='single'
                     checked={values.civil === 'single'}
                     onChange={onChange}
                    />
                </label>
                <label>Married
                    <input
                     type="radio"
                     name="civil"
                     value='married'
                     checked={values.civil === 'married'}
                     onChange={onChange}
                    />
                </label>
                <div className='form-group checkboxes'>
                    <h4>Hobbies</h4>
                     <label>Hiking
                      <input
                      type="checkbox"
                      name='hiking'
                      checked={values.hobbies.hiking}
                      onChange={onCheckboxChange}
                    />
                    </label>
                    <label>Reading
                    <input
                      type="checkbox"
                      name="reading"
                      checked={values.hobbies.reading}
                      onChange={onCheckboxChange}
                    />
                    </label>
                    <label>Coding
                    <input
                      type="checkbox"
                      name="coding"
                      checked={values.hobbies.coding}
                      onChange={onCheckboxChange}
                    />
                    </label>
                </div>
            </div>

        </form>
    )
}



