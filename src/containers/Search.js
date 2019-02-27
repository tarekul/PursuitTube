import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios'

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {isLoading:true, data:[],offset:10}
    }

    getVideoList = (query,number)=>{
        console.log(number)
        axios({ 
            method: 'get',
            url: 'https://www.googleapis.com/youtube/v3/search',
            params: {
                part: 'snippet',
                maxResults: number,
                videoDefinition: 'high',
                type: 'video',
                videoEmbeddable: 'true',
                key: 'AIzaSyDEsrVHQ4ZTg26TevQhP882rTDPFyCc4Jw',
                q: query,
                pageToken: ''
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
            
            this.setState({isLoading:false,data:videoListData, offset:number},
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
    
    // handleOnScroll = (query) => {
        
    // }

    componentDidMount(){
        //console.log(this.props.match.params.search_term)
        this.getVideoList(this.props.match.params.search_term,10)
        // window.addEventListener('scroll', this.handleOnScroll(this.props.match.params.search_term))
        
    }


    componentWillReceiveProps(newProps){
        //console.log(this.props.match.params.search_term)
        //console.log(newProps.match.params.search_term)
        this.getVideoList(newProps.match.params.search_term,10)
        // window.addEventListener('scroll', this.handleOnScroll(newProps.match.params.search_term))
        
    }

    

    loadMore(){
        console.log('worked')
    }

    render() {
        if(this.state.isLoading) return <h1>loading</h1>
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
            <button onClick={e=>{this.getVideoList(this.props.match.params.search_term,this.state.offset+10)}}>Load More</button>
            </>
            
        }     
    }   
}


export default withRouter(Search)