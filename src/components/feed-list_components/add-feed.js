// Dependencies
import React from 'react';
import Services from '../../services/services';

// Global Variables
const feedServices = new Services();

// React Component
const AddFeed = props => {
    const clickHandler = e => {
        if (e.keyCode === 13) {
            if (!feedServices.getActiveUser()) {
                alert('No user has been selected.')
                e.target.value = '';
                return;
            } else if (e.target.value.length <= 1) {
                alert('Feed needs to have more than one character.')
                return;
            }
            feedServices.addFeed(feedServices.getActiveUser(), e.target.value);
            props.updateUserFeed(e.target.value);
            e.target.value = '';
        }
    }

    return(
        <div className='col col-6'>
            <div className="input-group mb-3">
                    <input type="text" className="form-control" aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-default" onKeyDown={clickHandler} />
                    <div className="input-group-append">
                        <span className="input-group-text" id="inputGroup-sizing-default" 
                            style={{maxHeight: 'fit-content'}}>Add</span>
                    </div>
            </div>

        </div>   

    )    
}

export default AddFeed;