import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './navbar.css';
import Services from '../services/services';

const searchService = new Services();

const Navbar = (props) => {
    
    const searchVid = (e) => {
        if (e.keyCode === 13) {
            if (e.target.value.length < 1) {
                alert('Input a search value!');
                return;
            }
            console.log('pressed enter');
            props.history.push('/video');
            console.log(searchService);
            searchService.addSearch(e.target.value);
        }
    }

    return (
        <div>
            <h1>PursuitTube</h1>
            <Link className='link' to='/'>Home</Link>
            <Link className='link' to='/video'>Video</Link>
            <Link className='link' to='/feedlist'>FeedList</Link>
            <input type='text' placeholder='Search...' onKeyDown={searchVid} ></input>
        </div>
    )
}

export default withRouter(Navbar);