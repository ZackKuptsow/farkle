import React from 'react';
import { connect } from 'react-redux';
import {
	Container,
	Row,
	Col,
	Card,
	Form,
	Button,
	Navbar
} from 'react-bootstrap';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import { setWebsocket } from '../actions';
import Dice from './Dice';
import Score from './Score';
import './App.css';

class App extends React.Component {
	state = {
		isLoggedIn: false,
		username: '',
		room: 'default',
		players: {}
	};

	client = new W3CWebSocket(
		'ws://127.0.0.1:8000/ws/game/' + this.state.room + '/'
	);

	componentDidMount() {
		setWebsocket(this.client);
		this.client.onopen = () => {
			console.log('Websocket Client Connect');
		};
		this.client.onmessage = message => {
			const { username, score } = JSON.parse(message.data);
			const playerCopy = Object.assign({}, this.state.players);
			playerCopy[username] = score;
			this.setState({ players: playerCopy });
		};
	}

	onButtonClicked = e => {
		this.client.send(
			JSON.stringify({
				type: 'turn',
				username: this.state.username,
				score: this.props.score
			})
		);
	};

	render() {
		console.log(this.state.players);
		return (
			<div>
				<Navbar>
					<Navbar.Brand className="header">Farkle</Navbar.Brand>
					{this.state.isLoggedIn ? (
						<div>
							<h3>Room Name: {this.state.room}</h3>
							<h3>Username: {this.state.username}</h3>
						</div>
					) : null}
				</Navbar>
				<Container>
					{this.state.isLoggedIn ? (
						<div>
							<Row className="scoreboard">
								<h2>Scoreboard</h2>
								{Object.keys(this.state.players).map(player => (
									<div key={player}>
										<h3>
											{player}:{' '}
											{this.state.players[player]}
										</h3>
									</div>
								))}
							</Row>
							<Row>
								<Col>
									<Score
										onButtonClicked={this.onButtonClicked}
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<Dice />
								</Col>
							</Row>
						</div>
					) : (
						<div>
							<Card bg="Secondary">
								<Card.Header as="h1">
									Create or Join Game
								</Card.Header>
								<Card.Body>
									<Form
										onSubmit={() =>
											this.setState({ isLoggedIn: true })
										}
									>
										<Form.Group>
											<Form.Label as={Row}>
												Room Name
											</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter room name..."
												value={this.state.room}
												onChange={e => {
													this.setState({
														room: e.target.value
													});
													this.value =
														this.state.value;
												}}
												required
											/>
										</Form.Group>
										<Form.Group>
											<Form.Label as={Row}>
												Userame
											</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter username..."
												value={this.state.username}
												onChange={e => {
													this.setState({
														username: e.target.value
													});
													this.value =
														this.state.value;
												}}
												required
											/>
										</Form.Group>
										<Button variant="light" type="submit">
											Enter Room
										</Button>
									</Form>
								</Card.Body>
							</Card>
						</div>
					)}
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		score: state.score,
		websocket: state.websocket
	};
};

export default connect(mapStateToProps, setWebsocket)(App);
