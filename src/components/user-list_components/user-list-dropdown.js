// Dependecies
import React, {Component} from 'react';
import Services from '../../services/services';

// Global Variables
const userServices = new Services();

// React Component
class UserListDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [
                {
                    name: 'Default',
                    feed: ['Music'],
                }
            ],
            activeIndex: null,
            activeSelection: false,
            activeUser: null,
        }
    }

    userClickHandler = e => {
        const innerArr = e.currentTarget.innerText.split('')
        const name = innerArr.slice(0, innerArr.length - 2).join('');
        console.log(name)
        userServices.activeUser(name);
        this.setState({
            activeUser: name,
            activeIndex: e.currentTarget.value,
            activeSelection: !this.state.activeSelection,
        });
    }

    deleteUserClick = e => {
        const button = e.target.parentNode;
        const li = button.parentNode;
        const innerArr = li.innerText.split('');
        const userName = innerArr.slice(0, innerArr.length - 2).join('');
        userServices.activeUser('');
        userServices.deleteHistory(userName);
        userServices.deleteUser(userName);
    }

    render() {
        return(
            <div className='col col-6'>
                <div className="card" style={{width: "18rem"}}>
                    <ul className="list-group list-group-flush">
                      {
                        (userServices.getUsers() && userServices.getUsers().length >= 1) ? 
                            userServices.getUsers().map((e, i) => {
                                return(
                                    (this.state.activeIndex === i) ? 
                                        <li className="list-group-item bg-dark text-white" key={i} value={i} onClick={this.userClickHandler}>
                                            {e.name}                                
                                            <button type="button" className="close" aria-label="Close">
                                                <span aria-hidden="true" onClick={this.deleteUserClick}>&times;</span>
                                            </button>
                                        </li> 
                                    :   <li className="list-group-item" key={i} value={i} onClick={this.userClickHandler}>
                                            {e.name}
                                            <button type="button" className="close" aria-label="Close">
                                                <span aria-hidden="true" onClick={this.deleteUserClick}>&times;</span>
                                            </button>
                                        </li>     
                                )      
                            }) :
                            this.state.users.map((e, i) => {
                                return(
                                    <li className="list-group-item" key={i}>
                                        {e.name}
                                    </li>
                                )
                            }) 
                      }
                    </ul>
                </div>
            </div>   
        )
    }
}

export default UserListDropdown;