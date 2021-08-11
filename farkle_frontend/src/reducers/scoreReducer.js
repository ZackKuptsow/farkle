// eslint-disable-next-line
export default (state = [], action) => {
	switch (action.type) {
		case 'PUSH_SCORE':
			return action.payload;
		default:
			return state;
	}
};
