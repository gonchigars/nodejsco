# Job Posting Board Backend with Email Automation

This is a Node.js backend application for a Job Posting Board with Email Automation. It allows companies to register, post jobs, and automatically sends email alerts when new jobs are posted.

## Features

- Company registration and authentication
- Job posting, retrieval, updating, and deletion
- Automated email alerts for new job postings

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd job-posting-board
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/job_board
   JWT_SECRET=your_jwt_secret_here
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
   Replace the values with your actual MongoDB URI, JWT secret, and email credentials.

## Running the Application

1. Start the MongoDB server.

2. Run the application:
   ```
   npm start
   ```

The server will start running on `http://localhost:3000`.

## API Endpoints

### Companies

- POST /api/companies/register - Register a new company
- POST /api/companies/login - Login for a company
- GET /api/companies/profile - Get company profile (requires authentication)
- PATCH /api/companies/profile - Update company profile (requires authentication)

### Jobs

- POST /api/jobs - Create a new job posting (requires authentication)
- GET /api/jobs - Get all job postings
- GET /api/jobs/:id - Get a specific job posting
- PATCH /api/jobs/:id - Update a job posting (requires authentication)
- DELETE /api/jobs/:id - Delete a job posting (requires authentication)

## Email Automation

The application automatically sends an email alert to a specified email address (currently hardcoded as 'example@recipient.com') whenever a new job is posted. In a production environment, you would implement a system for users to subscribe to job alerts.

## Security Notes

- Ensure to keep your `.env` file secure and never commit it to version control.
- In a production environment, implement proper security measures such as rate limiting, HTTPS, and more comprehensive input validation.

## Version Control

A `.gitignore` file is included in this project. It specifies intentionally untracked files that Git should ignore, such as the `node_modules` directory, environment variable files, logs, and OS-specific files. This helps keep the repository clean and prevents sensitive information from being exposed.

## Future Improvements

- Implement user roles (admin, company, job seeker)
- Add more advanced search and filtering options for jobs
- Implement a front-end client
- Add tests for all components
- Implement email subscription system for job seekers
