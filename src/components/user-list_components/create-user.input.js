// Dependencies
import React from 'react';
import Services from '../../services/services';

// Global Variables
const userServices = new Services();

// React Component
const CreateUserInput = props => {
    const keyDownHandler = e => {
       if (e.keyCode === 13) {
            const userName = e.target.value;
            props.userInputHandler(userName);
            userServices.addUser(userName);
            e.target.value = '';
        } 
    }

    const clickHandler = e => {
        const buttonDiv = e.target.parentNode;
        const fatherDiv = buttonDiv.parentNode;
        const inputValue = fatherDiv.children[0].value;
        const userName = inputValue;
        props.userInputHandler(userName);
        userServices.addUser(userName);
        fatherDiv.children[0].value = '';
    }

    return (
        <>
            <div className='col col-6'>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-default" onKeyDown={keyDownHandler} />
                    <div className="input-group-append">
                      <span className="input-group-text" id="inputGroup-sizing-default"
                      style={{'maxHeight': 'fit-content'}} onClick={clickHandler}>Add</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateUserInput;