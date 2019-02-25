// Dependencies
import React from 'react';
import Services from '../../services/services';

// Global Variables
const userServices = new Services();

// React Component
const CreateUserInput = props => {
    const clickHandler = e => {
       if (e.keyCode === 13) {
            const userName = e.target.value;
            props.userInputHandler(userName);
            userServices.addUser(userName);
            e.target.value = '';
        }
    }

    return (
            <div className="input-group mb-3 col-6">
                <input type="text" className="form-control" aria-label="Sizing example input" 
                aria-describedby="inputGroup-sizing-default" onKeyDown={clickHandler} />
                <div className="input-group-append">
                    <span className="input-group-text" id="inputGroup-sizing-default" 
                        style={{maxHeight: 'fit-content'}}>Add</span>
                </div>
            </div>
    )
}

export default CreateUserInput;