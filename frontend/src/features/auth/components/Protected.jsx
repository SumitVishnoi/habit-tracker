import React from 'react'
import { useAuth } from '../hook/useAuth'
import {Navigate} from "react-router"

const Protected = ({children}) => {
    const {loading, user} = useAuth()

    if(loading) {
        return <h1>loading...</h1>
    }

    if(!user) {
        return <Navigate to="/login" />
    }
  return (
    children
  )
}

export default Protected
