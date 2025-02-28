# Developers Hub

A platform for developers to connect, share insights, and engage with the community. Built using the MERN stack, it enables developers to create profiles, post content, and interact with others in a collaborative environment.
## Features

- **User Authentication**: Secure signup and login functionality.
- **Developer Profiles**: Users can create and manage their profiles, showcasing their skills and experience.
- **Create and Like Posts**: Developers can share posts, insights, and updates, while also engaging with others' posts through likes.
- **Real-time Chat**: Connect and chat with other developers using a seamless real-time messaging system powered by Socket.io.
- **Search and Connect**: Easily search for developers by skills and interests.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Authentication**: JWT (JSON Web Token)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PraveenGokavarapu12/developers-hub.git
   ```
2. Navigate to the project folder:
   ```bash
   cd developers-hub
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     SOCKET_IO_SERVER_URL=your_socket_server_url
     ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project can be deployed using platforms like **Vercel** for the frontend and **Render/Heroku** for the backend.

## Contributing

Feel free to submit issues and pull requests to contribute to the project!

## License

This project is licensed under the **MIT License**.

---

Developers Hub is built to empower developers by providing a space to collaborate, network, and share knowledge. Happy coding! 🚀

