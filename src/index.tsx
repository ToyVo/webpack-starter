import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

class Square extends React.Component<{value: 'X' | 'O' | undefined, onClick: () => void}> {
	override render() {
		return (
			<button className="square" onClick={() => this.props.onClick()}>
				{this.props.value}
			</button>
		);
	}
}

class Board extends React.Component<{}, {squares: Array<'X' | 'O' | undefined>}> {
	constructor(props: {}) {
		super(props);
		this.state = {
			squares: Array(9).fill(undefined)
		};
	}

	renderSquare(i: number) {
		return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
	}

	handleClick(i: number) {
		const squares = this.state.squares.slice();
		squares[i] = 'X';
		this.setState({squares});
	}

	override render() {
		const status = 'Next player: X';

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
	override render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board/>
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Game/>);