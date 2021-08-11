// eslint-disable-next-line
export default (state = [], action) => {
	switch (action.type) {
		case 'ROLL_DICE':
			return {
				clickedLen: Object.values(action.payload.clicked).filter(
					function (value) {
						return value !== undefined;
					}
				).length
			};
		default:
			return state;
	}
};
