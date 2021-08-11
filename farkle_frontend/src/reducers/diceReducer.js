// eslint-disable-next-line
export default (state = [], action) => {
	switch (action.type) {
		case 'ROLL_DICE':
			return action.payload.dice;
		default:
			return state;
	}
};
