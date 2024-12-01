import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import React from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import About from './components/About'
import SearchResultsPage from './components/search-results-page'

const App = () => {
  const apiKey = import.meta.env.VITE_API_KEY
  const [progress, setProgress] = useState(0)

  return (
    <>
      <Router basename="/newsmonki">
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Navbar />
        <Routes>
          <Route exact path="/about" element={<About category="about" />} />
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={9} country="us" category="general" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={9} country="us" category="technology" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={9} country="us" category="health" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={9} country="us" category="sports" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={9} country="us" category="science" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={9} country="us" category="entertainment" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={9} country="us" category="business" />} />
          <Route exact path='/results/:id' element={<SearchResultsPage apiKey={apiKey} />}  />
        </Routes>
      </Router>
    </>
  )
}


export default App;