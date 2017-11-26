var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
	render() {
		return (
			<div className="home-container">
				<h1>Github Battle : Comparez vos repos et gagnez.</h1>

				<Link to="/battle" className="button">
					GO !
				</Link>
			</div>
		);
	}
}

module.exports = Home;
