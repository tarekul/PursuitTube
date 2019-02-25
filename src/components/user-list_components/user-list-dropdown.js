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
            ]
        }
    }

    render() {
        return(
            <div className="card col-6" style={{width: "18rem"}}>
                <ul className="list-group list-group-flush">
                  {
                    (userServices.getUsers()) ? 
                        userServices.getUsers().map((e, i) => {
                            return(
                                <li className="list-group-item" key={i}>{e.name}</li>        
                            )      
                        }) :
                        this.state.users.map((e, i) => {
                            return(
                                <li className="list-group-item" key={i}>{e.name}</li>
                            )
                        }) 
                  }
                </ul>
            </div>
        )
    }
}

export default UserListDropdown;