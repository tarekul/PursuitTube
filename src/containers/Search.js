import React from 'react'
import Services from '../services/services'

const Search = ()=>{
    const services = new Services
    services.addSearch('ariana grande')
    return <h1>{services.getSearch()}</h1>
}

export default Search