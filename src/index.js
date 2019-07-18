import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// We have 3 React components: Square, Board and Game.
// The Square component renders a single <button>.
// The Board component renders 9 squares.
// The Game component renders a board with placeholder values.

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
    {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      // Set the first move to be X by default by changing state in our Board constructor.
      // Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game's state will be saved.
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    // we call .slice to create a copy of the squares array to modify instead of modifying the existing array.
    // this is so we do not mutate the data directly.
    // Avoiding direct data mutation lets us keep previous versions of the game’s history intact, and reuse them later.
    squares[i] = this.state.xIsNext? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
     />

  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
