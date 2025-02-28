# Developers Hub

Developers Hub is a web platform where developers can create accounts, showcase their skills, view other developers, and rate their performance. It includes real-time messaging and profile-based interactions, making it easier for developers to collaborate and network.

## Features

- **User Authentication**: Secure login and registration using JWT authentication.
- **Developer Profiles**: Users can create and edit profiles, adding skills and experience.
- **Search and Filter**: Find developers based on skills and expertise.
- **Rating System**: Users can rate and review other developers.
- **Real-time Chat**: Send and receive messages instantly using Socket.io.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Communication**: Socket.io

## Installation

### Prerequisites

- Node.js installed
- MongoDB instance running

### Steps to Run

1. **Clone the repository**
   ```sh
   git clone https://github.com/PraveenGokavarapu12/developers-hub.git
   cd developers-hub
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     SOCKET_SERVER_URL=your_socket_server_url
     ```
4. **Start the backend server**
   ```sh
   npm run server
   ```
5. **Start the frontend**
   ```sh
   npm start
   ```
6. **Open the application**
   - Visit `http://localhost:3000` in your browser.

## Contributing

1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to the branch and submit a Pull Request.

## License

This project is licensed under the MIT License.

