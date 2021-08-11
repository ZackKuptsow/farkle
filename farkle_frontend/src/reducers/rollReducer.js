// eslint-disable-next-line
export default (state = [], action) => {
	switch (action.type) {
		case 'ROLL_COUNT':
			return action.payload;
		default:
			return state;
	}
};
