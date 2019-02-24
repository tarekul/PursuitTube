import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import Services from '../services/services'

const Search = (props)=>{
    console.log('here')
    const services = new Services();
    //services.addSearch('ariana grande')
    console.log(props)
    return <h1>{props.match.params.search_term}</h1>
}

export default withRouter(Search)