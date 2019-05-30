import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import LoginPage from "./login/LoginPage";
import SignupPage from "./signup/SignupPage";
import ContactForm from "./contacts/ContactForm";
import NotFound from "./NotFound";
import { Container } from 'semantic-ui-react'

class App extends Component {
	render() {
		return (
			<Router>
				<Container>
					<Header />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={LoginPage} />
						<Route path="/signup" component={SignupPage} />
						<Route path="/new-contact" component={ContactForm} />
						<Route path="/edit-contact/:hash" component={ContactForm} />
						<Route component={NotFound} />
					</Switch>
				</Container>
			</Router>
		);
	}
};

export default App;