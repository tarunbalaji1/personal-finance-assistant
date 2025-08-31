# 💰 Personal Finance Assistant
**🚀 Live Demo:** [https://effortless-custard-37a7a8.netlify.app](https://effortless-custard-37a7a8.netlify.app)
A full-stack web application designed to help users track, manage, and understand their financial activities. Built with the **MERN stack** (MongoDB, Express.js, React, Node.js), this app allows users to log income and expenses, categorize transactions, and visualize their spending habits through an interactive, multi-chart dashboard.

## ✨ Features

* **Secure User Authentication**: Full sign-up and login system using JSON Web Tokens (JWTs) for secure, session-based access.
* **Transaction Management**: Users can easily add, view, and delete their personal income and expense records.
* **Interactive Dashboard**: A dynamic dashboard with multiple charts to visualize financial data:
    * Total Income vs. Total Expense Bar Chart.
    * Horizontal Bar Chart for detailed spending by category.
    * Doughnut Chart for proportional expense breakdown.
* **Receipt Scanning**: Users can upload an image of a receipt, and the application will use OCR (Optical Character Recognition) to automatically extract the total amount.
* **Data Filtering**: The transaction list can be filtered by a specific date range.
* **Dual Theme**: A persistent dark/light mode toggle for user comfort.

## 🛠️ Tech Stack

* **Frontend**: React, React Router, Axios, Chart.js
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (with Mongoose)
* **Authentication**: JSON Web Tokens (JWT), bcrypt.js
* **File Handling**: Multer (for uploads), Tesseract.js (for OCR)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You must have the following software installed on your machine:
* [Node.js](https://nodejs.org/en/) (which includes npm)
* [Git](https://git-scm.com/)
* A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for the database.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/tarunbalaji1/personal-finance-assistant.git
    cd personal-finance-assistant
    ```

2.  **Setup the Backend:**
    * Navigate to the backend directory:
        ```bash
        cd backend
        ```
    * Install the required dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `personal-finance-backend` root. Copy the contents of `.env.example` (if you have one) or use the template below and fill in your details:
        ```
        MONGO_URI=<YOUR_MONGODB_ATLAS_CONNECTION_STRING>
        JWT_SECRET=<YOUR_RANDOMLY_GENERATED_JWT_SECRET_KEY>
        PORT=5000
        ```
    * Start the backend server:
        ```bash
        node server.js
        ```
        The server should be running on `http://localhost:5000`.

3.  **Setup the Frontend:**
    * Open a new terminal window and navigate to the frontend directory:
        ```bash
        cd frontend
        ```
    * Install the required dependencies:
        ```bash
        npm install
        ```
    * Start the React development server:
        ```bash
        npm start
        ```
        The application should open automatically in your browser at `http://localhost:3000`.

You can now sign up for a new account and begin using the application!