const generateDice = numOfDice => {
	return new Array(numOfDice)
		.fill(1)
		.map(num => num * Math.floor(Math.random() * 6) + 1);
};

export const rollDice = (
	dice = generateDice(6),
	clicked = {
		die1: undefined,
		die2: undefined,
		die3: undefined,
		die4: undefined,
		die5: undefined,
		die6: undefined
	}
) => {
	document
		.querySelectorAll('.diceClicked')
		.forEach(e => e.classList.remove('diceClicked'));
	return {
		type: 'ROLL_DICE',
		payload: { dice: [...dice, ...generateDice(6 - dice.length)], clicked }
	};
};

export const diceClicked = (
	index,
	die,
	clicked = {
		die1: undefined,
		die2: undefined,
		die3: undefined,
		die4: undefined,
		die5: undefined,
		die6: undefined
	}
) => {
	const click = {};
	if (clicked[index] !== undefined) {
		click[index] = undefined;
		return {
			type: 'DICE_CLICKED',
			payload: { ...clicked, ...click }
		};
	} else {
		click[index] = die;
		return {
			type: 'DICE_CLICKED',
			payload: { ...clicked, ...click }
		};
	}
};

export const pushScore = (totalScore = 0, turnScore = 0) => {
	totalScore =
		typeof totalScore !== 'object' ? parseInt(totalScore, 10) : null;
	return {
		type: 'PUSH_SCORE',
		payload: totalScore + turnScore
	};
};

export const rollCount = (reset = false, roll = 1) => {
	roll = typeof roll !== 'object' ? parseInt(roll, 10) : null;
	roll += reset ? 0 : 1;
	return {
		type: 'ROLL_COUNT',
		payload: roll
	};
};

export const setWebsocket = (client = '') => {
	return {
		type: 'SET_WEBSOCKET',
		payload: client
	};
};
