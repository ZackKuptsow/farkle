export const calculate = dice => {
	let score = 0;

	const counts = {};
	for (const num of dice) {
		counts[num] = counts[num] ? counts[num] + 1 : 1;
	}

	if (6 in counts && counts[6] === 3) {
		score += 600;
	} else if (4 in counts && counts[4] === 3) {
		score += 400;
	} else if (3 in counts && counts[3] === 3) {
		score += 300;
	} else if (2 in counts && counts[2] === 3) {
		score += 200;
	}

	if (5 in counts && counts[5] < 3) {
		score += 50 * counts[5];
	} else if (5 in counts && counts[5] === 3) {
		score += 500;
	} else if (5 in counts && counts[5] > 3) {
		score += 500 + 50 * (counts[5] - 3);
	}

	if (1 in counts && counts[1] < 3) {
		score += 100 * counts[1];
	} else if (1 in counts && counts[1] === 3) {
		score += 1000;
	} else if (1 in counts && counts[1] > 3) {
		score += 1000 + 100 * (counts[1] - 3);
	}

	return score;
};
