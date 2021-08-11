import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { rollDice, diceClicked, pushScore, rollCount } from '../actions';
import { calculate } from '../util';

class Score extends React.Component {
	componentDidUpdate() {
		if (this.props.score >= 10000) {
			alert('WINNER!!!');
		}
		this.props.onButtonClicked();
	}

	render() {
		return (
			<div>
				<h1>Total Score: {this.props.score}</h1>
				<Button
					className="buttonPress"
					onClick={() => {
						this.props.pushScore(
							this.props.score,
							calculate(Object.values(this.props.clicked))
						);
						this.props.rollDice([]);
						this.props.diceClicked({});
						this.props.rollCount(true);
					}}
				>
					Push Score
				</Button>
				<h3>
					Turn Score: {calculate(Object.values(this.props.clicked))}
				</h3>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		dice: state.dice,
		clicked: state.clicked,
		score: state.score,
		roll: state.roll
	};
};

export default connect(mapStateToProps, {
	rollDice,
	diceClicked,
	pushScore,
	rollCount
})(Score);
