import express from 'express'
import http from 'http'
import {Server as SocketServer} from 'socket.io'

const app = express()
export const server = http.createServer(app)
const io = new SocketServer(server)

io.on('connection', socket => {
  console.log('Client connected', socket.id);

  // Emmiting query for forntend
  socket.emit('ping')

  // Listening frontend query
  socket.on('pong', () => {
    console.log('pong');
  })

})

app.set('port', 3000)
export const port = app.get('port')
