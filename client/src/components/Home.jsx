import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ContactsList from './contacts/ContactsList';
import { getContacts} from '../actions/contactsActions';
import { Container, Header, Menu, Segment, Button } from 'semantic-ui-react';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
		};
		this.onChange = this.onChange.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
	}

	onSearchClick(e) {
		e.preventDefault();
		if (this.props.auth.isAuthenticated) {
			if (this.state.searchText !== "") {
				this.props.getContacts(this.state.searchText);
			}
		}
	}

	onChange(e) {
		if (this.props.auth.isAuthenticated) {
			this.setState({ searchText: e.target.value });
			const str = e.target.value.trim();
			this.props.getContacts(str.length > 0 ? str : null);
		}
	}

	render() {
		const { isAuthenticated } = this.props.auth;
		return (
			<Container>
				<Menu attached='top'>
					<Menu.Menu>
						<Menu.Item>
							<Link to="/new-contact" >
								<Button circular icon='add' >
								</Button>
							</Link>
						</Menu.Item>
					</Menu.Menu>

					<Menu.Menu position='right'>
						<div className='ui right aligned category search item'>
							<div className='ui transparent icon input'>
								<input className='prompt' onChange={this.onChange} type='text' placeholder='Search contacts...' />
								<i className='search link icon' onClick={this.onSearchClick} />
							</div>
							<div className='results' />
						</div>
					</Menu.Menu>
				</Menu>

				<Segment attached='bottom'>
					{isAuthenticated ? <ContactsList searchText={this.state.searchText} /> : <Header textAlign="center">You must log in to view contacts</Header>}
				</Segment>
			</Container >
		);
	}
}

Home.propTypes = {
	auth: PropTypes.object.isRequired,
	getContacts: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, { getContacts })(Home);