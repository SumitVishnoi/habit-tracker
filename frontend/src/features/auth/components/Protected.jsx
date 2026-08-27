import React from 'react'
import { useAuth } from '../hook/useAuth'
import {Navigate} from "react-router"
import { Loader2 } from 'lucide-react'

const Protected = ({children}) => {
    const {loading, user} = useAuth()

    if(loading) {
        return  <div className='flex items-center justify-center h-screen'>
          <Loader2  size={16} className="animate-spin" />
        </div>
    }

    if(!user) {
        return <Navigate to="/login" />
    }
  return (
    children
  )
}

export default Protected
