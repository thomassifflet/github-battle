var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');

class Results extends React.Component {
	componentDidMount() {
		var players = queryString.parse(this.props.location.search);
		api.battle([ players.playerOneName, players.playerTwoName ]).then(function(results) {
			console.log(results);
		});
	}
	render() {
		return <div>Résultats</div>;
	}
}

module.exports = Results;
