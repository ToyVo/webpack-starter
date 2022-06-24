import React, {FC} from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

type SquareCell = 'X' | 'O' | undefined;

const Square: FC<{value: SquareCell, onClick: () => void}> = (props) =>
	<button className="square" onClick={props.onClick}>
		{props.value}
	</button>;

const Board: FC<{squares: Array<SquareCell>, onClick: (index: number) => void}> = (props) =>
	<div>
		<div className="board-row">
			<Square value={props.squares[0]} onClick={() => props.onClick(0)}/>
			<Square value={props.squares[1]} onClick={() => props.onClick(1)}/>
			<Square value={props.squares[2]} onClick={() => props.onClick(2)}/>
		</div>
		<div className="board-row">
			<Square value={props.squares[3]} onClick={() => props.onClick(3)}/>
			<Square value={props.squares[4]} onClick={() => props.onClick(4)}/>
			<Square value={props.squares[5]} onClick={() => props.onClick(5)}/>
		</div>
		<div className="board-row">
			<Square value={props.squares[6]} onClick={() => props.onClick(6)}/>
			<Square value={props.squares[7]} onClick={() => props.onClick(7)}/>
			<Square value={props.squares[8]} onClick={() => props.onClick(8)}/>
		</div>
	</div>;

class Game extends React.Component<{}, {history: Array<{squares: Array<SquareCell>}>, xIsNext: boolean, stepNumber: number}> {
	constructor(props: {}) {
		super(props);
		this.state = {
			history: [{squares: Array(9).fill(undefined)}],
			stepNumber: 0,
			xIsNext: true
		};
	}

	override render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber]!;
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ? `Go to move #${move}` : 'Go to game start';
			return <li key={move}>
				<button onClick={() => this.jumpTo(move)}>{desc}</button>
			</li>;
		});

		let status: string;
		if(winner) {
			status = `Winner ${winner}`;
		} else {
			status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
		}
		return (
			<div className="game">
				<div className="game-board">
					<Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}

	handleClick(i: number) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1]!;
		const squares = current.squares.slice();
		if(calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{squares}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		});
	}

	jumpTo(step: number) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0
		});
	}
}

const calculateWinner = (squares: Array<SquareCell>) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for(let i = 0; i < lines.length; i++) {
		// @ts-ignore
		const [a, b, c] = lines[i];
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Game/>);
