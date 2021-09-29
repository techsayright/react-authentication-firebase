import React from 'react'
import { Route } from 'react-router'
import UpdatePass from '../Container/UpdatePass'

export default function Home() {
    return (
        <div className='container'>
            <h1 className='text-center my-5'>Hello User, Welcome to Our Premium Page</h1>
            <Route exact path='/home/updatePass' component={UpdatePass}/>
        </div>
    )
}
