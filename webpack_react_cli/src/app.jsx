import React, { Suspense, lazy } from "react"
import { Link, Routes, Route } from "react-router-dom"
import "./style/index.less"

const Home = lazy(() => import(/* webpackChunkName: 'home' */"./components/home"))
const About = lazy(() => import(/* webpackChunkName: 'about' */"./components/about"))

function App() {
  return (
    <div>
      <h1>React App</h1>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
