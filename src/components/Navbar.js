import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
    <div>
    <h1>Navbar</h1>
    <Link to='/'>Home</Link>
    <Link to='/video'>Video</Link>
    <Link to='/search'>Search</Link>
    <Link to='/userlist'>UserList</Link>
    <Link to='feedlist'>FeedList</Link>
    </div>
    )
}

export default Navbar