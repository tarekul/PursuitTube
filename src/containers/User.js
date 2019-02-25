//Dependencies
import React, {Component} from 'react'
import UserListTitle from '../components/user-list_components/user-list'
import CreateUserTitle from '../components/user-list_components/create-user'
import CreateUserInput from '../components/user-list_components/create-user.input';
import UserListDropdown from '../components/user-list_components/user-list-dropdown';
import Services from '../services/services';

//Global Variables
const userServices = new Services();

// React Component
class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [
                {
                    name: ['Default'],
                    feed: ['Music'],
                }
            ]
        }
    }   

    userInputHandler = (userName) => {
        console.log('Prev State: ', this.state)
        console.log('Prev UsersArr: ', this.state.users)
        const newUsersArr = [];
        newUsersArr.push({
            name: userName,
            feed: ['Music'],
        });
        console.log(newUsersArr)
        this.setState({
            users: newUsersArr,
        }, () => {
            console.log('New State: ', this.state)
            console.log('New UsersArr: ', this.state.users)
        });
    }

    render() {
        return(
            <>
                <div className='container'>
                    <div className='row'>
                        <CreateUserTitle />
                        <UserListTitle />
                    </div>
                    <div className='row'>
                        <CreateUserInput userInputHandler={this.userInputHandler}/>
                        <UserListDropdown />
                    </div>
                </div>
            </>
        )
    }
}

export default User;