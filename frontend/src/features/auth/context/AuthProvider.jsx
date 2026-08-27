import React from 'react'
import { useState } from 'react'
import { AuthContext } from './AuthContext'

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

  return (
    <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
