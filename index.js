const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST']
    }
})
app.get('/', (req, res) => {
    res.send('ar-messanger-backend started.')
})
io.on("connection", (socket) => {

    socket.on('joinRoom', room => socket.join(room))

    socket.on('newMessage', ({ fullChat, room }) => {
        io.in(room).emit('getLatestMessage', fullChat)

    })
});

const port = 8000
server.listen(port, () => console.log(`app listining app ${port}`)) 