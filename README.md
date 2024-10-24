# Short URL Web Application

This is a full-stack web application that allows users to convert long URLs into shortened versions. It includes both the frontend and backend components. 

## Features

- Convert long URLs to short URLs.
- Redirect shortened URLs to the original long URL.
- Track the number of clicks on shortened URLs.

## Screenshots of the Application

### Frontend

![image](https://github.com/user-attachments/assets/0e2875b3-18ad-4450-ba8b-925c52aa9cba)

![image](https://github.com/user-attachments/assets/14e1837d-fda5-4d7c-9e53-b34ac5b487a8)

### Backend

![image](https://github.com/user-attachments/assets/c80ec919-a114-4dd5-bef0-e12476ac4fbf)

![image](https://github.com/user-attachments/assets/c79b3c25-1507-41d1-8617-85dc58a73376)

## Tech Stack

- **Frontend**: ReactJS, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB

## Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
4. [Frontend Setup](#frontend-setup)
5. [Backend Setup](#backend-setup)
6. [Environment Variables](#environment-variables)
7. [Running the Application](#running-the-application)
8. [Contributing](#contributing)

## Project Structure

```bash
ShortURL_App/
│
├── backend/                # Backend API (Node.js)
│   ├── config/             # Configuration files (e.g., database connection)
│   ├── controllers/        # Business logic
│   ├── middlware/          # Middleware (authentication, error handling, etc.)
│   ├── models/             # Mongoose Models
│   ├── routes/             # API routes
│   ├── services/           # Service layer (handling core logic)
│   ├── utils/              # Utility functions and helpers
│   └── app.js              # Entry point for the backend server
│
├── frontend/               # Frontend (React)
│   ├── public/             # Static files
│   ├── src/                # React components and pages
│   └── package.json        # Frontend dependencies
│
└── README.md               # Project documentation
```

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or using MongoDB Atlas)
- [Git](https://git-scm.com/)

## Getting Started

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/MilanPatel28/ShortURL_App.git
cd ShortURL_App
```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

The frontend will be running on [http://localhost:5173](http://localhost:5173).

### Backend Setup

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up MongoDB connection by configuring environment variables (see the next section for more details).

4. Start the backend server:

    ```bash
    npm run dev
    ```

The backend will be running on [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file in the `backend` directory to configure the environment variables required for MongoDB and other services. The file should contain the following:

```plaintext
PORT=3000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:3000
```

You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance.

## Running the Application

Once both the frontend and backend servers are up and running, you can access the application at [http://localhost:3000](http://localhost:3000).

- To shorten a URL, enter it in the input field on the homepage.
- The application will generate a shortened URL, which can be used to redirect to the original long URL.

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.
