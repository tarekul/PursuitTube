import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import './navbar.css';
import Services from '../services/services';

const searchService = new Services();

class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    searchVid = (e) => {
        if (e.keyCode === 13) {
            if (e.target.value.length < 1) {
                return;
            }
            console.log('pressed enter');
            searchService.addSearch(e.target.value);
            this.props.history.push(`/search/${e.target.value}`);
            e.target.value = '';
        }
        else console.log(e.keyCode)
    }

     clickedSearch = (e) => {
        console.log(e.target.parentNode)
        const searchBar = e.target.parentNode;
        const searchFormVal = searchBar.children[0].value;

        if (searchFormVal.length < 1) return;
        searchService.addSearch(searchFormVal);
        this.props.history.push(`/search/${searchFormVal}`);
        searchBar.children[0].value = '';
    }

    render() {
    return (
        <div>
            <nav className="navbar navbar-light bg-light justify-content-between">
                <form className="form-inline">
                    <Link className='col logo' to='/'>PursuitTube</Link>
                    <Link className='link col' to='/'>Home</Link>
                    <Link className='link col' to='/user'>User</Link>
                    <Link className='link col' to='/feedlist'>FeedList</Link>
                    <Link className='link col' to='/history'>History</Link>
                    <div className='searchbar'>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search for videos..." aria-label="Search" onKeyDown={this.searchVid}/>
                        <button className="btn btn-outline-success my-2 my-sm-0 srch_btn" type="submit" onClick={this.clickedSearch}>Search</button>
                    </div>
                </form>
            </nav>
        </div>
    )
}

}

export default withRouter(Navbar);




