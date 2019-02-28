import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios'

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {isLoading:true, data:[],pageToken:''}
    }

    getVideoList = (query,pageToken='')=>{
        axios({ 
            method: 'get',
            url: 'https://www.googleapis.com/youtube/v3/search',
            params: {
                part: 'snippet',
                maxResults: 10,
                videoDefinition: 'high',
                type: 'video',
                videoEmbeddable: 'true',
                key: 'AIzaSyDjQJDqIRITkKviY4lVH3eUF1NPcNrgGuA',
                q: query,
                pageToken: pageToken
            }
        })
        .then(response=>{
            const videoListData = []
            response.data.items.forEach(vid=>{
                let temp = {}
                temp.video_id = vid.id.videoId  //video id
                temp.img = vid.snippet.thumbnails.medium.url //img url
                temp.title = vid.snippet.title //title
                temp.channel_title = vid.snippet.channelTitle
                videoListData.push(temp)
            })
            console.log(response.data.nextPageToken)
            let temp2 = this.state.data.concat(videoListData)
            this.setState({isLoading:false,data:temp2,pageToken:response.data.nextPageToken},
                ()=>{
                let obj = {vids: this.state.data};
                let suggestions = JSON.parse(localStorage.getItem('suggestions'));
                if (!suggestions) {
                    localStorage.setItem('suggestions',JSON.stringify(obj))
                }
                else {
                    suggestions.vids = suggestions.vids.concat(obj.vids)
                    localStorage.setItem('suggestions',JSON.stringify(suggestions))
                }
            })
        })
    }


    componentDidMount(){
        //console.log(this.props.match.params.search_term)
        this.getVideoList(this.props.match.params.search_term)
        // window.addEventListener('scroll', this.handleOnScroll(this.props.match.params.search_term))
        window.addEventListener('scroll', this.handleOnScroll);
    }


    componentWillReceiveProps(newProps){
        //console.log(this.props.match.params.search_term)
        //console.log(newProps.match.params.search_term)
        this.getVideoList(newProps.match.params.search_term)
        window.addEventListener('scroll', this.handleOnScroll)
        
    }

    handleOnScroll = () => {

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    
    
        if(scrolledToBottom) {
          setTimeout(this.getVideoList(this.props.match.params.search_term,this.state.pageToken), 3000 )
          window.scrollTo(0,3500)
        }
      }

    render() {
        if(this.state.isLoading) return <div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span>
      </div>
        else{ 
            // <h3>Search results for BLANK</h3>
            return <>{this.state.data.map((vid, i)=>{
                return <div className='row' key={i}>
                    <div className='col'>
                        <Link to={`/video/${vid.video_id}`}><img src={vid.img} alt={vid.img} /></Link>
                    </div>
                    <div className='col'>
                        <p>{vid.title}</p>
                        <p>{vid.channel_title}</p>
                    </div>
                </div>
            })}
            {/* <button onClick={e=>{this.getVideoList(this.props.match.params.search_term,this.state.offset+10)}}>Load More</button> */}
            </>
            
        }     
    }   
}


export default withRouter(Search)