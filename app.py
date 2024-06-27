from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

def generate_sudoku(difficulty):
    # This is a simplified Sudoku generator
    # For a real game, you'd want a more sophisticated algorithm
    base = 3
    side = base * base

    def pattern(r, c):
        return (base * (r % base) + r // base + c) % side

    def shuffle(s):
        return random.sample(s, len(s))

    rBase = range(base)
    rows = [g * base + r for g in shuffle(rBase) for r in shuffle(rBase)]
    cols = [g * base + c for g in shuffle(rBase) for c in shuffle(rBase)]
    nums = shuffle(range(1, base * base + 1))

    board = [[nums[pattern(r, c)] for c in cols] for r in rows]

    squares = side * side
    
    # Adjust the number of empty cells based on difficulty
    if difficulty == 'easy':
        empties = squares * 1 // 3
    elif difficulty == 'medium':
        empties = squares * 1 // 2
    else:  # hard
        empties = squares * 2 // 3

    for p in random.sample(range(squares), empties):
        board[p // side][p % side] = 0

    return board

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/new_game', methods=['GET'])
def new_game():
    difficulty = request.args.get('difficulty', 'medium')
    board = generate_sudoku(difficulty)
    return jsonify(board)

if __name__ == '__main__':
    app.run(debug=True)