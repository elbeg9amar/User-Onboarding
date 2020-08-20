import React from 'react'

function Friend(props){
    const { detail } = props
    
    if(!detail){
        return <h3>
            Working fetching your friend&apos;s detail..
        </h3>
    }
    return(
        <div>
            <h2>Username:{detail.username}</h2>
    <h3>Email: {detail.email}</h3>
    <h3>
        Role:{detail.role}
    </h3>
    <h3>
        Civil:{detail.civil}
    </h3>
    <h3>Hobby: 
        <ul>
            {detail.hobbies.map(hob => {
                return <li>{hob}</li>
            })

            }
        </ul>

    </h3>
        </div>
        
    )
}

export default Friend