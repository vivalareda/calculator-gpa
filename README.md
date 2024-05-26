# GPA Calculator

This project is a GPA calculator web application that allows students to enter their courses, credits, and grades to calculate their GPA. The project consists of a React frontend and a Flask backend, both containerized with Docker and deployed to Google Cloud Run.

# Features

- User can enter their current GPA and completed credits.
- User can add courses with their respective credits and grades.
- Calculates the new GPA based on entered courses.
- Smooth transitions between steps.
- Validates input data with error messages.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Zod, Axios
- **Backend**: Flask, Flask-CORS
- **Containerization**: Docker
- **CI/CD**: GitHub Actions, Google Cloud Run

## Running Locally

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the frontend server:
    ```bash
    npm run dev
    ```

4. The frontend should now be running at http://localhost:3000


### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask server:
    ```bash
    python app.py
    ```

5. The backend should now be running at http://localhost:5001
