import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'
import './Search.css'
import Services from '../services/services'

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {isLoading:true,data:[],pageToken:'',hover:false}
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
                key: 'AIzaSyBA0U8ir7qJWROY9zMNsiYgTsGFvRO5oD0',//'AIzaSyDjQJDqIRITkKviY4lVH3eUF1NPcNrgGuA',
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
                temp.descrip = vid.snippet.description
                temp.date = vid.snippet.publishedAt
                videoListData.push(temp)
            })
            //console.log(response.data.nextPageToken)
            let temp2 = this.state.data.concat(videoListData)
            let obj = {vids: temp2};
            let suggestions = JSON.parse(localStorage.getItem('suggestions'));
            if (!suggestions) {
                localStorage.setItem('suggestions',JSON.stringify(obj))
            }
            else {
                suggestions.vids = suggestions.vids.concat(obj.vids)
                localStorage.setItem('suggestions',JSON.stringify(suggestions))
            }
            this.setState({isLoading:false,data:temp2,pageToken:response.data.nextPageToken})
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
        this.setState({data:[]})
        this.getVideoList(newProps.match.params.search_term)
        window.addEventListener('scroll', this.handleOnScroll)
        
    }

    handleOnScroll = () => {

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    
    
        if(scrolledToBottom) {
          setTimeout(this.getVideoList(this.props.match.params.search_term,this.state.pageToken), 2000 )
          window.scrollTo(0,5000)
        }
    }

    relativeTime = (dateString)=>{
        const temp = dateString.slice(0,10)
        let str = ''
        for(let i=0;i<temp.length;i++){
            if(temp[i] !== '-') str += (temp[i])
        }
        //console.log(moment(str, "YYYYMMDD").fromNow())
        return moment(str, "YYYYMMDD").fromNow()
    }

    addHistory = (vidObj)=>{
        let services = new Services()
        if(services.getActiveUser()) {
            services.addHistory(services.getActiveUser(),vidObj)
        }

    }

    render() {
        if(this.state.isLoading) return <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
        else{ 
            // <h3>Search results for BLANK</h3>
            return <>
            <div className="jumbotron">
            <div style={{marginLeft:'10%'}}>
            {this.state.data.map((vid, i)=>{
                return <div className='hover row' key={i}>
                <div className='col-4'>
                    <Link to={`/video/${vid.video_id}`}><img onClick={e=>this.addHistory(vid)} src={vid.img} alt={vid.img} /></Link>
                </div>
                <div className='col-6'>
                    <h5>{vid.title}</h5>
                    <p>{vid.channel_title}</p>
                    <p>{vid.descrip}</p>
                    <p>{this.relativeTime(vid.date)}</p>
                </div>
                </div>

            })}
            {/* <button onClick={e=>{this.getVideoList(this.props.match.params.search_term,this.state.offset+10)}}>Load More</button> */}
            </div>
            </div>
            </>
            
        }     
    }   
}


export default withRouter(Search)
