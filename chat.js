const socket = io()
const chatBox = document.getElementById('chatBox')

socket.on('success', msg => alert(msg))
socket.on('error', msg => alert(msg))

const user = () => localStorage.getItem('username')

socket.on('chatHistory', messages => {
    chatBox.innerHTML = messages.map(e => e.user == 'default' ? `<div class="p-4 max-w-full break-words"><div class="text-sm text-gray-500">System</div><div class="mt-1 text-gray-800">${e.message}</div></div>` : `<div class="p-4 max-w-full break-words"><div class="text-sm text-gray-500">${e.user}</div><div class="mt-1 text-gray-800">${e.messages}</div></div>`).join('')
})
socket.on('newMessage', message => {
    chatBox.innerHTML += message.user == 'default' ? `<div class="p-4 max-w-full break-words"><div class="text-sm text-gray-500">System</div><div class="mt-1 text-gray-800">${message.message}</div></div>` : `<div class="p-4 max-w-full break-words"><div class="text-sm text-gray-500">${message.user}</div><div class="mt-1 text-gray-800">${message.message}</div></div>`
})

const setUsername = () => {
    localStorage.setItem('username', usernameMain.value)
    socket.emit('setName', usernameMain.value)
}
const JoinRoom = (val = false) => {
    socket.emit('joinRoom', { userName: user(), room: val ? val : JoinRoomName.value })
    localStorage.setItem('room', val ? val : JoinRoomName.value)
}
const CreateRoom = () => {
    socket.emit('CreateRoom', { userName: user(), room: CreateRoomName.value })
    localStorage.setItem('room', CreateRoomName.value)
}
const sendMessage = () => {
    socket.emit('sendMessage', { userName: user(), text: message.value })
}

if (localStorage.getItem('room')) JoinRoom(localStorage.getItem('room'))