const socket = io();

let username = '';

// Prompt user to enter their name when entering the chatroom
while (username.length < 3) {
    username = prompt('Please enter your name (at least 3 characters):');
}

const userColors = {};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

userColors[username] = getRandomColor();

const btnSend = document.querySelector('#send');
const input = document.querySelector('#input');

// Add event listener for "keydown" event on input element
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && input.value.length > 1) {
        // If "Enter" key was pressed and input value is not empty, emit chat message and clear text-field
        socket.emit('chat message', { name: username, message: input.value, color: userColors[username] });
        input.value = '';
    }
});

// Add event listener for "click" event on send button
btnSend.addEventListener('click', () => {
    // Emit chat message and clear text-field
    if (input.value.length > 1) {
        socket.emit('chat message', { name: username, message: input.value, color: userColors[username] });
        input.value = '';
    }
});

socket.on('chat message', (data) => {
    const messageBox = document.querySelector('.message-box');
    const backgroundColor = data.color || 'lightgreen';
    // Update message format to include username and user color
    messageBox.innerHTML += `<div class="message" style="background-color:${backgroundColor};"><strong>${data.name}: </strong>${data.message}</div>`;
});

socket.on('server message', (message) => {
    const messageBox = document.querySelector('.message-box');
    messageBox.innerHTML += `<div class="message">${message}</div>`;
});
