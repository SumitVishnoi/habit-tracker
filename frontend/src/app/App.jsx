import React, { useEffect } from 'react'
import "./App.css"
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { useAuth } from '../features/auth/hook/useAuth'

const App = () => {
  const {handleGetCurrentUser} = useAuth()

  useEffect(() => {
    handleGetCurrentUser()
  }, [handleGetCurrentUser])
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
