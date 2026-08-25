import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Dashboard/Home'

function App() {
 

  return (
    <>

     <Navbar/>
     <Home/>

    </>
  )
}

export default App
