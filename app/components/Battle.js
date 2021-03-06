var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function PlayerPreview(props) {
	return (
		<div>
			<div className="column">
				<img className="avatar" src={props.avatar} alt={props.username} />
				<h2 className="username">{'@' + props.username}</h2>
				<button className="reset" onClick={props.onReset.bind(null, props.id)}>
					Réinitialiser
				</button>
			</div>
		</div>
	);
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string,
	username: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired
};

class PlayerInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		var value = event.target.value;

		this.setState(function() {
			return {
				username: value
			};
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.onSubmit(this.props.id, this.state.username);
	}

	render() {
		return (
			<form className="column" onSubmit={this.handleSubmit}>
				<label className="header" htmlFor="username">
					{this.props.label}
				</label>
				<input
					id="username"
					placeholder="login github"
					type="text"
					autoComplete="off"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<button className="button" type="submit" disabled={!this.state.username}>
					Envoyer
				</button>
			</form>
		);
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
};

class Battle extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleSubmit(id, username) {
		this.setState(function() {
			var newState = {};
			newState[id + 'Name'] = username;
			newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
			return newState;
		});
	}

	handleReset(id) {
		this.setState(function() {
			var newState = {};
			newState[id + 'Name'] = '';
			newState[id + 'Image'] = null;
			return newState;
		});
	}
	render() {
		var playerOneName = this.state.playerOneName;
		var playerTwoName = this.state.playerTwoName;
		var playerOneImage = this.state.playerOneImage;
		var playerTwoImage = this.state.playerTwoImage;
		var match = this.props.match;

		return (
			<div>
				<h1>Battle !</h1>
				<div className="row">
					{!playerOneName && <PlayerInput id="playerOne" label="Joueur Un" onSubmit={this.handleSubmit} />}
					{!playerOneImage !== null && (
						<PlayerPreview
							avatar={playerOneImage}
							username={playerOneName}
							onReset={this.handleReset}
							id="playerOne"
						/>
					)}
					{!playerTwoImage !== null && (
						<PlayerPreview
							avatar={playerTwoImage}
							username={playerTwoName}
							onReset={this.handleReset}
							id="playerTwo"
						/>
					)}
					{!playerTwoName && <PlayerInput id="playerTwo" label="Joueur Deux" onSubmit={this.handleSubmit} />}
				</div>

				{playerOneImage &&
				playerTwoImage && (
					<Link
						className="button"
						to={{
							pathname: match.url + '/results',
							search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
						}}
					>
						Battle !
					</Link>
				)}
			</div>
		);
	}
}

module.exports = Battle;
