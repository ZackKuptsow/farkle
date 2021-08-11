// eslint-disable-next-line
export default (state = {}, action) => {
	switch (action.type) {
		case 'DICE_CLICKED':
			return action.payload;
		default:
			return state;
	}
};
