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
            searchService.addSearch(e.target.value);
            console.log(props.history);
            props.history.push(`/search/${e.target.value}`);
            e.target.value = '';
            console.log(searchService);
        }
    }

    return (
        <div>
            <nav class="navbar navbar-light bg-light justify-content-between">
                <form class="form-inline">
                    <Link className='col logo' to='/'>PursuitTube</Link>
                    <Link className='link col' to='/'>Home</Link>
                    <Link className='link col' to='/user'>User</Link>
                    <Link className='link col' to='/feedlist'>FeedList</Link>
                    <div className='searchbar'>
                    <input class="form-control mr-sm-2" type="search" placeholder="Search for videos..." aria-label="Search" onKeyDown={searchVid}/>
                    <button class="btn btn-outline-success my-2 my-sm-0 srch_btn" type="submit">Search</button>
                    </div>
                    
                </form>
            </nav>
        </div>
    )
}

export default withRouter(Navbar);




