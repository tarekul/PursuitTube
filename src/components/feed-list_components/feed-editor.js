import React, {Component} from 'react';
import Services from '../../services/services';

const feedServices = new Services();

class FeedEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeUser: {
                name: 'Default',
                feed: ['Music'],
            }
        }
    }

    deleteFeed = e => {
        const button = e.target.parentNode;
        const li = button.parentNode;
        const innerArr = li.innerText.split('');
        const name = innerArr.slice(0, innerArr.length - 2).join('');
        console.log(name)
    }

    render() {
        return(
            <div className="card" style={{width: "18rem"}}>
                <ul className="list-group list-group-flush">
                  {
                    (feedServices.getFeed(feedServices.getActiveUser())) ? 
                        feedServices.getFeed(feedServices.getActiveUser()).map((e, i) => {
                            return(
                                    <li className="list-group-item" key={i} value={i}>
                                        {e}
                                        <button type="button" className="close" aria-label="Close">
                                            <span aria-hidden="true" onClick={this.deleteFeed}>&times;</span>
                                        </button>
                                    </li>     
                            )      
                        }) :
                        this.state.activeUser.feed.map((e, i) => {
                            return(
                                <li className="list-group-item" key={i}>
                                    {e}
                                </li>
                            )
                        }) 
                  }
                </ul>
            </div> 
        )
    }
}

export default FeedEditor;