import React from 'react';
import { connect } from 'react-redux';
import { rollDice, diceClicked, rollCount, pastClicked } from '../actions';
import { Button } from 'react-bootstrap';
import { calculate } from '../util';

import image1 from '../images/1.png';
import image2 from '../images/2.png';
import image3 from '../images/3.png';
import image4 from '../images/4.png';
import image5 from '../images/5.png';
import image6 from '../images/6.png';
const images = [image1, image2, image3, image4, image5, image6];

class Dice extends React.Component {
	componentDidUpdate() {
		const farkle =
			calculate(this.props.dice.slice(this.props.clickedLen)) === 0;
		if (farkle) {
			alert('FARKLE!');
			this.props.rollCount(true);
			this.props.rollDice();
			this.props.diceClicked({});
		}
	}

	renderDice() {
		return this.props.dice
			? this.props.dice.map((die, index) => {
					return (
						<img
							key={index}
							id={`die${index + 1}`}
							src={images[die - 1]}
							alt={`die #${die}`}
							onClick={() => {
								this.props.diceClicked(
									`die${index + 1}`,
									die,
									this.props.clicked
								);
								let dice = document.getElementById(
									`die${index + 1}`
								);
								dice.classList.toggle('diceClicked');
							}}
						/>
					);
			  })
			: null;
	}

	render() {
		return (
			<div>
				<div>{this.renderDice(this.props.dice)}</div>
				<Button
					onClick={() => {
						this.props.rollDice(
							[
								...Object.values(this.props.clicked).filter(
									e => e !== undefined
								)
							],
							this.props.clicked
						);
						this.props.diceClicked();
						this.props.rollCount(false, this.props.roll);
					}}
					className="buttonPress"
				>
					Roll Dice
				</Button>
				<h3>Roll: {this.props.roll}</h3>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		dice: state.dice,
		clicked: state.clicked,
		roll: state.roll,
		clickedLen: state.clickedLen
	};
};

export default connect(mapStateToProps, {
	rollDice,
	diceClicked,
	rollCount
})(Dice);
