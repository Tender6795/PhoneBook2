import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from "./SignupForm";
import { userSignupRequest } from '../../actions/signupActions';
import { Container, Grid, GridColumn } from 'semantic-ui-react'


class SignupPage extends Component {
	render() {
		const { userSignupRequest } = this.props;
		return (
			<Container >
				<Grid centered>
					<GridColumn width="6">
						<SignupForm userSignupRequest={userSignupRequest} />
					</GridColumn>
				</Grid>
			</Container>
		);
	}
}

SignupPage.propTypes = {
	userSignupRequest: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest })(SignupPage);