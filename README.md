# Sudoku
 Sudoku project is a web-based implementation of the classic Sudoku puzzle game.
 The project combines a Flask backend for game logic and board generation with a frontend built using HTML, CSS, and JavaScript for user interaction.

**Key Features Implemented:
**
1. Dynamic Sudoku board generation with varying difficulty levels (easy, medium, hard).
2. Interactive game board where users can input numbers.
3. Difficulty selection option for new games.
4. Solution checking functionality to verify if the puzzle is solved correctly.
5. Celebratory animations (fireworks and confetti) upon successful completion.
6. Responsive design for a good user experience on different devices.

**Technologies Used:
**
Backend: Python with Flask framework
Frontend: HTML, CSS, JavaScript

**Project Setup Steps:**

**Environment Setup:**

Ensure Python is installed on your system (Python 3.6 or higher recommended).
Install Flask by running: pip install flask

**Project Structure:
**
Create the following folder structure:
Sudoku/
├── app.py
├── /static/
│   ├── styles.css
│   ├── script.js
└── /templates/
    └── index.html

**File Creation:
**
Create app.py in the root directory and copy the provided Flask application code.
In the templates folder, create index.html and copy the provided HTML code.
In the static folder:
Create styles.css and copy the provided CSS code.
Create script.js and copy the provided JavaScript code.

**Running the Application:
**
Open a terminal or command prompt.
Navigate to the project root directory.
Run the command: python app.py
The server should start, typically on http://127.0.0.1:5000

**Playing the Game:
**
Select a difficulty level from the dropdown menu.
Click "New Game" to start a new puzzle.
Click on empty cells to input numbers.
Click "Check Solution" when you think you've solved the puzzle.

