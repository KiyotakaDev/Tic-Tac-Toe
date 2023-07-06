import { useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

function App() {
  const [tiles, settiles] = useState(Array(9).fill('Toy vivo'))

  // sending query from front
  socket.emit('board', tiles)

  return (
    <div>App</div>
  )
}

export default App