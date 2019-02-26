import React, {Component} from 'react';
import Services from '../../services/services';

const feedServices = new Services();

class FeedEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [
                {
                    name: 'Default',
                    feed: ['Music',],
                },
            ],
        }
    }

    componentDidMount = () => {
        console.log(feedServices.getUsers());
    }

    render() {
        return(
            <div className='col col-6'>
                <h1>Dropdown goes here</h1>
            </div>
        )
    }
}

export default FeedEditor;