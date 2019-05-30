import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createContact, getContactByHash, updateContact } from '../../actions/contactsActions';
import { Button, Form, Message, Loader, Container, Grid, GridColumn, Header } from 'semantic-ui-react'
import validateContactInput from '../../validations/contact';
import { Redirect } from 'react-router-dom';

class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lastName: '',
			firstName: '',
			phone: '',
			hash: '',
			company: '',
			email: '',
			photo: {},
			errors: {},
			message: '',
			isLoading: false,
			isValid: false,
			redirect: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillMount() {
		const hash = this.props.match.params.hash;
		// console.dir(this.props.match.params);
		if (hash) {
			this.props.getContactByHash(hash)
				.then(res => {
					// console.dir(res);
					if (res) {
						this.setState({
							 id: res.data._id,
							hash: res.data.hash,
							lastName: res.data.lastName,
							firstName: res.data.firstName,
							phone: res.data.phone,
							company: res.data.company,
							email: res.data.email,
							isEdit: true
						});
					}
				});
		}
	}

	fileSelectedHandler = event => {
		this.setState({
			photo: event.target.files[0]
		});
	};

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	isValid() {
		const { errors, isValid } = validateContactInput(this.state);

		if (!isValid) {
			this.setState({ errors });
		}

		return isValid;
	}

	onSubmit(e) {
		e.preventDefault();

		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });

			const fd = new FormData();
			console.log(this.state);
			fd.append('lastName', this.state.lastName);
			fd.append('firstName', this.state.firstName);
			fd.append('phone', this.state.phone);
			fd.append('company', this.state.company);
			fd.append('email', this.state.email);

			if (this.state.photo) {
				console.log(this.state.photo);
				fd.append('photo', this.state.photo, this.state.photo.name);
			}

			if (this.state.isEdit) {
				this.props.updateContact(this.state.hash, fd)
					.then((res) => {
						this.setState({
							redirect: true,
							isLoading: false,
							message: res ? res.data.message : ""
						})
					},
						(err) => this.setState(
							{
								errors: err.response ?
									err.response.data : {},
								isLoading: false
							}));
			} else {
				console.log("create contact");
				this.props.createContact(fd)
					.then((res) => {
						this.setState({
							redirect: true,
							isLoading: false,
							message: res ? res.data.message : ""
						})
					},
						(err) => this.setState(
							{
								errors: err.response ?
									err.response.data : {},
								isLoading: false
							}));
			}
		}
	}

	render() {
		const { errors, redirect } = this.state;
		const { isAuthenticated } = this.props.auth;
		if (!isAuthenticated) return <Redirect to='/login' />;

		if (redirect) return <Redirect to='/' />;
		return (
			<Container>
				<Grid centered>
					<GridColumn width="6">
						<Header textAlign="center" as="h1"></Header>
						<Form error onSubmit={this.onSubmit}>
							<Message success visible={this.state.message !== ""} content={this.state.message} />
							<Message error content={errors.message} />
							<Form.Field>
								<label>Last Name</label>
								<input
									type="text"
									name="lastName"
									onChange={this.onChange}
									value={this.state.lastName}
									placeholder="Last Name" />
							</Form.Field>
							<Message error content={errors.lastName} />
							<Form.Field>
								<label>First Name</label>
								<input
									type="text"
									name="firstName"
									onChange={this.onChange}
									value={this.state.firstName}
									placeholder="First Name" />
							</Form.Field>
							<Message error content={errors.firstName} />
							<Form.Field>
								<label>Phone</label>
								<input
									type="text"
									name="phone"
									onChange={this.onChange}
									value={this.state.phone}
									placeholder="Phone" />
							</Form.Field>
							<Message error content={errors.phone} />
							<Form.Field>
								<label>Company</label>
								<input
									type="text"
									name="company"
									onChange={this.onChange}
									value={this.state.company}
									placeholder="Company" />
							</Form.Field>
							<Form.Field>
								<label>Email</label>
								<input
									type="email"
									name="email"
									onChange={this.onChange}
									value={this.state.email}
									placeholder="Email" />
							</Form.Field>
							<Message error content={errors.email} />
							<Form.Field>
								<label>Photo</label>
								<input type="file" name="photo" onChange={this.fileSelectedHandler} />
							</Form.Field>
							<Loader active={this.state.isLoading} size='medium'>Loading</Loader>
							<Button disabled={this.state.isLoading} type='submit'>Save</Button>
						</Form>
					</GridColumn>
				</Grid>
			</Container>
		);
	}
}

ContactForm.propTypes = {
	auth: PropTypes.object.isRequired,
	createContact: PropTypes.func,
	getContactById: PropTypes.func,
	updateContact: PropTypes.func
};

function mapStateToProps(state) {
	return {
		auth: state.auth,
	};
}

export default connect(mapStateToProps, { createContact, getContactByHash, updateContact })(ContactForm);