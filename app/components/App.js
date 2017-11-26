var React = require('react');

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Navbar = require('./Navbar');
var Popular = require('./Popular');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="container">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/battle" component={Battle} />
						<Route path="/popular" component={Popular} />
						<Route path="/battle/results" component={Results} />
						<Route
							render={function() {
								return (
									<div>
										<h1>Page introuvable :/</h1>
									</div>
								);
							}}
						/>
					</Switch>
				</div>
			</Router>
		);
	}
}

module.exports = App;
