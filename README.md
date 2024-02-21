# webDev
## Getting started
# Description

This project implements a feedback form using HTML, CSS, and JavaScript on the front end, and Node.js with Express on the backend. The form allows users to submit feedback including their name, email, education phase, rating of the education center, comments, and answers to additional questions. The backend handles form submissions, serves additional questions based on the selected education phase, and provides endpoints to fetch surveys and feedback data.

# Prerequisites
Before running the project, ensure you have the following installed:

# Node.js - JavaScript runtime environment
Installation
Clone the repository to your local machine:
git clone <repository-url>

# Navigate to the project directory:
cd project-directory

# Install project dependencies using npm:
npm install

# Start the Node.js server:
node server.js
Open a web browser and navigate to http://localhost:3000 to access the feedback form.
Fill out the feedback form and submit your feedback.

# API Endpoints
POST /submitFeedback: Submits feedback data to the server.
GET /feedbacks: Retrieves all submitted feedback data.
GET /surveys: Retrieves available surveys with their details.
GET /questions/:educationPhase: Retrieves additional questions based on the specified education phase.

# Backend Dependencies
express: Web framework for Node.js.
body-parser: Middleware for parsing incoming request bodies.
cors: Middleware for enabling CORS (Cross-Origin Resource Sharing).
path: Node.js module for working with file and directory paths.
Version
Node.js: 20.11.0