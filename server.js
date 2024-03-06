const express = require('express'),
    socketIo = require('socket.io'),
    fs = require('fs'),
    http = require('http')

const app = express()
app.use(express.static(__dirname))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
const server = http.createServer(app)
const io = socketIo(server)
const users = JSON.parse(fs.readFileSync('users.json')) || {}
const chats = JSON.parse(fs.readFileSync('chats.json')) || {}

const update = (type) => fs.writeFile(`${type}.json`, JSON.stringify(type == 'users' ? users : chats), () => { })

// User making the socket connection
io.on('connection', socket => {
    // socket is basically that user's connection
    socket.on('setName', name => {
        if (users[name]) return socket.emit('error', 'Username already taken')
        users[name] = { roomId: '', socketId: socket.id }
        update('users')
        socket.emit('success', 'User has been registered')
    })
    socket.on('joinRoom', ({ userName, room }) => {
        if (!users[userName] || !chats[room]) return socket.emit('error', 'User or chat not found')
        const message = { user: 'default', message: userName + ' has joined the room' }
        if (users[userName].roomId && String(users[userName].roomId).length > 0) {
            const tempRoom = users[userName].roomId
            const message = { user: 'default', message: `${userName} has left the room` }
            socket.to(tempRoom).emit('newMessage', message)
            chats[tempRoom].push(message)
            //Bug Fixed, it was update(chats) changed to update("chats")
            update("chats")
            socket.leave(users[userName].roomId)
        }
        users[userName].roomId = room
        users[userName].socketId = socket.id
        socket.join(room)
        chats[room].push(message)
        update('users')
        update('chats')
        io.to(room).emit('newMessage', message)
        // socket.emit('success', 'You joined ' + room)
        socket.emit('chatHistory', chats[room])
    })
    socket.on('CreateRoom', ({ userName, room }) => {
        if (!users[userName] || chats[room]) return socket.emit('error', 'User not found or chat Exists')
        const message = { user: 'default', message: userName + ' Created the room: ' + room }
        if (users[userName].roomId && String(users[userName].roomId).length > 0) {
            const tempRoom = users[userName].roomId
            const message = { user: 'default', message: `${userName} has left the room` }
            socket.to(tempRoom).emit('newMessage', message)
            chats[tempRoom].push(message)
            //Bug Fixed, it was update(chats) changed to update("chats")
            update("chats")
            socket.leave(users[userName].roomId)
        }
        users[userName].roomId = room
        socket.join(room)
        chats[room] = [message]
        update('users')
        update('chats')
        socket.emit('success', 'You have crated ' + room)
        io.to(room).emit('newMessage', message)
        socket.emit('chatHistory', chats[room])
    })
    socket.on('sendMessage', ({ userName, text }) => {
        if (!users[userName] || !chats[users[userName].roomId]) return socket.emit('error', 'User or chat not found')
        const message = { user: userName, message: text }
        const room = users[userName].roomId
        chats[room].push(message)
        update('chats')
        io.to(room).emit('newMessage', message)
    })
    socket.on('disconnect', _ => {
        const userSelected = Object.keys(users).filter(e => users[e].socketId == socket.id)
        if (userSelected.length > 0) {
            const userName = userSelected[0]
            const room = users[userName].roomId
            const message = { user: 'default', message: `${userName} has disconnected` }
            io.to(room).emit('newMessage', message)
            chats[room].push(message)
            update('chats')
        }
    })
})

server.listen(3000)
