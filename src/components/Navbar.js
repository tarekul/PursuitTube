import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './navbar.css';

const Navbar = (props) => {
    
    const searchVid = (e) => {
        if (e.keyCode === 13) {
            console.log('pressed enter');
            props.history.push('/video');
            localStorage.setItem('searchValue', e.target.value)
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