import React from 'react';
import LoginForm from './LoginForm';
import { Container, Grid, GridColumn, Header } from 'semantic-ui-react'


class LoginPage extends React.Component {
	render() {
		return (
			<Container>
				<Grid centered>
					<GridColumn width="6">
						<Header textAlign="center" as="h1">Login</Header>
						<LoginForm />
					</GridColumn>
				</Grid>
			</Container>
		);
	}
}

export default LoginPage;