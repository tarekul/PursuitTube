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
        }
    }

    userClickHandler = e => {
        console.log(e.currentTarget.value)
        this.setState({
            activeIndex: e.currentTarget.value,
            activeSelection: !this.state.activeSeletion,
        });
    }

    render() {
        return(
            <div className="card" style={{width: "18rem"}}>
                <ul className="list-group list-group-flush">
                  {
                    (userServices.getUsers()) ? 
                        userServices.getUsers().map((e, i) => {
                            return(
                                <li className="list-group-item" key={i} value={i} onClick={this.userClickHandler}>
                                    {e.name}
                                    <button type="button" className="close" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
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
        )
    }
}

export default UserListDropdown;