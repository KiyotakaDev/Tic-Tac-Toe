import io from 'socket.io-client'

const socket = io('/')

function App() {
  // listening query from back
  socket.on('ping', () => {
    console.log('ping');
  })

  // sending query from front
  socket.emit('move')

  return (
    <div>App</div>
  )
}

export default App