// Dependencies
import React from 'react'
import UserListTitle from '../components/user-list_components/user-list'
import CreateUserTitle from '../components/user-list_components/create-user'
import CreateUserInput from '../components/user-list_components/create-user.input';
import UserListDropdown from '../components/user-list_components/user-list-dropdown';

// React Component
const User = () => {
    return(
        <>
            <div className='container'>
                <div className='row'>
                    <CreateUserTitle />
                    <UserListTitle />
                </div>
                <div className='row'>
                    <CreateUserInput />
                    <UserListDropdown />
                </div>
            </div>
        </>
    )
}

export default User;