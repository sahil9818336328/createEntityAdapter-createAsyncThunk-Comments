import React from 'react'
import './App.css'
import 'rsuite/dist/rsuite.min.css'
import Comments from './features/comments/Comments'

function App() {
  return (
    <div className='App'>
      <h1>CREATE ENTITY ADAPTER, ASYNC + COMMENTS</h1>
      <Comments />
    </div>
  )
}

export default App
