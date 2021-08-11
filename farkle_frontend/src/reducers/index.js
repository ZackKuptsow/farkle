import { combineReducers } from 'redux';
import diceReducer from './diceReducer';
import clickedReducer from './clickedReducer';
import scoreReducer from './scoreReducer';
import rollReducer from './rollReducer';
import pastClickedReducer from './pastClickedReducer';
import websocketReducer from './websocketReducer';

export default combineReducers({
	dice: diceReducer,
	clicked: clickedReducer,
	score: scoreReducer,
	roll: rollReducer,
	clickedLen: pastClickedReducer,
	websocket: websocketReducer,
	clickedLen: pastClickedReducer
});
