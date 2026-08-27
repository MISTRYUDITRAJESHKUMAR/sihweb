# Academia-Industry Collaboration Portal

This is a Minimum Viable Product (MVP) built according to the problem statement SIH26044. It is designed to be simple and easy to understand for a young developer.

## Tech Stack Used
*   **Frontend**: React.js, Tailwind CSS
*   **Backend**: Python (FastAPI)
*   **Database**: Mocked in memory for simplicity (MongoDB can be easily plugged in)
*   **AI Integration**: Mock AI endpoint built-in for Skill Assessment.

## How to Run the Website

### Step 1: Start the Backend (API)
1. Open a new terminal.
2. Navigate to the backend folder:
   ```bash
   cd C:\Users\admin\Downloads\SIH_044\backend
   ```
3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will now be running on `http://localhost:8000`*

### Step 2: Start the Frontend (UI)
1. Open a second new terminal.
2. Navigate to the frontend folder:
   ```bash
   cd C:\Users\admin\Downloads\SIH_044\frontend
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to the link shown in the terminal (usually `http://localhost:5173`).

## Features Included
- **Student Dashboard**: View skills, run AI assessment to find skill gaps, and apply for recommended jobs.
- **Industry Dashboard**: View verified students and their skills.
