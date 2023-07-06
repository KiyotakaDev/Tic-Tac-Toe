import io from 'socket.io-client'

const socket = io('/')

function App() {
  // listening query from back
  socket.on('test', () => {
    console.log('test');
  })

  // sending query from front
  socket.emit('test2')

  return (
    <div>App</div>
  )
}

export default App