import { useState } from 'react'
import io from 'socket.io-client'
import { Board } from './components/Board';

const socket = io('http://localhost:3000')

function App() {
  // listening query from back
  socket.on('test', () => {
    console.log('test');
  })

  // sending query from front
  socket.emit('test2')

  return (
    <Board></Board>
  )
}

export default App