document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('sudoku-board');
    const newGameBtn = document.getElementById('new-game-btn');
    const difficultySelect = document.getElementById('difficulty');
    let messageElement;

    function createBoard(data) {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                const value = data[i][j];
                if (value !== 0) {
                    cell.textContent = value;
                    cell.classList.add('given');
                } else {
                    cell.contentEditable = true;
                    cell.addEventListener('input', (e) => {
                        const input = e.target.textContent;
                        if (input && /^[1-9]$/.test(input)) {
                            e.target.classList.add('user-input');
                        } else {
                            e.target.textContent = '';
                            e.target.classList.remove('user-input');
                        }
                    });
                }
                board.appendChild(cell);
            }
        }
    }

    function checkSolution() {
        const cells = document.querySelectorAll('.cell');
        const board = [];
        let row = [];
    
        for (let i = 0; i < cells.length; i++) {
            row.push(parseInt(cells[i].textContent) || 0);
            if ((i + 1) % 9 === 0) {
                board.push(row);
                row = [];
            }
        }
    
        // Check rows and columns
        for (let i = 0; i < 9; i++) {
            const rowSet = new Set(board[i]);
            const colSet = new Set(board.map(row => row[i]));
            if (rowSet.size !== 9 || colSet.size !== 9 || rowSet.has(0) || colSet.has(0)) {
                return false;
            }
        }
    
        // Check 3x3 subgrids
        for (let i = 0; i < 9; i += 3) {
            for (let j = 0; j < 9; j += 3) {
                const subgrid = new Set();
                for (let x = 0; x < 3; x++) {
                    for (let y = 0; y < 3; y++) {
                        subgrid.add(board[i + x][j + y]);
                    }
                }
                if (subgrid.size !== 9 || subgrid.has(0)) {
                    return false;
                }
            }
        }
    
        return true;
    }

    function newGame() {
        const difficulty = difficultySelect.value;
        fetch(`/new_game?difficulty=${difficulty}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length === 9 && data.every(row => Array.isArray(row) && row.length === 9)) {
                    createBoard(data);
                    createCheckSolutionButton();
                } else {
                    throw new Error('Invalid board data received');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Failed to start a new game. Please try again.', 'error');
            });
    }

    function createCheckSolutionButton() {
        let checkButton = document.getElementById('check-solution-btn');
        if (!checkButton) {
            checkButton = document.createElement('button');
            checkButton.id = 'check-solution-btn';
            checkButton.textContent = 'Check Solution';
            document.querySelector('.container').appendChild(checkButton);
        }
        checkButton.addEventListener('click', () => {
            if (checkSolution()) {
                showMessage('Congratulations! You solved it correctly!', 'success');
                createFireworks();
            } else {
                showMessage('Oops! Please try again. Your solution is incorrect.', 'error');
            }
        });
    }

    function showMessage(text, type) {
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'message';
            document.querySelector('.container').appendChild(messageElement);
        }
        messageElement.textContent = text;
        messageElement.className = type;
        messageElement.style.display = 'block';
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000);
    }

    function createFireworks() {
        const fireworksContainer = document.createElement('div');
        fireworksContainer.classList.add('fireworks');
        document.body.appendChild(fireworksContainer);

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.classList.add('firework');
                firework.style.left = `${Math.random() * 100}%`;
                firework.style.top = `${Math.random() * 100}%`;
                firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                fireworksContainer.appendChild(firework);

                setTimeout(() => {
                    firework.remove();
                }, 1000);
            }, i * 50);
        }

        setTimeout(() => {
            fireworksContainer.remove();
        }, 10000);
    }

    newGameBtn.addEventListener('click', newGame);
    difficultySelect.addEventListener('change', newGame);

    // Start a new game when the page loads
    newGame();
});