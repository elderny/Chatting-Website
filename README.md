# ChatApp

![Chatting Website](https://github.com/elderny/Chatting-Website/blob/main/Screenshot%202024-03-05%20084413.png "Chatting Website")
ChatApp is a real-time chatting application built with Node.js and Socket.io, allowing users to create rooms, join existing ones, and exchange messages instantly. Data, including user information and chat messages, is stored in a JSON file, making it easy to manage and persist chat history.

## Features

- **Real-time messaging:** Send and receive messages instantly with Socket.io.
- **Room management:** Users can create new chat rooms and join existing ones.
- **Persistent storage:** Chat history is stored in a JSON file, allowing for data retrieval across sessions.
- **Easy setup:** Minimal dependencies and straightforward setup process.

## Prerequisites

Before you begin, ensure you have installed the latest version of [Node.js](https://nodejs.org/). This project was built using Node.js version 14.x.

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/elderny/Chatting-Website
cd ChatApp
```

Install the necessary dependencies:

```bash
npm install
```

## Usage

Start the server:

```bash
node server.js
```

By default, the server will run on `http://localhost:3000`. Open this URL in your web browser to start using ChatApp.

## Configuring the JSON Storage

The application uses a `data.json` file to store chat data. This file is automatically created and updated as users send messages and perform actions in the chat application.

## Contributing

Contributions to ChatApp are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeatureName`.
3. Make your changes and commit them: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeatureName`.
5. Submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
