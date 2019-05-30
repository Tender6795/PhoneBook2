import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Card, Image, Button } from 'semantic-ui-react';
import { deleteContact } from '../../actions/contactsActions';
import {apiPrefix} from '../../config';


class ContactItem extends Component {
	constructor(props) {
		super(props);
		this.redirect = this.redirect.bind(this);
	}

	redirect() {
		this.props.history.push({

		});
	}

	onDeleteClick(e) {
		e.preventDefault();
		this.props.deleteContact(this.props.contact.hash);
	}

	render() {
		// console.dir(this.props.contact);
		 const path=apiPrefix+this.props.contact.pathToPicture.replace('public','');
		const contact = this.props.contact;
		// console.dir(contact);
		return (
			<Card fluid style={{ height: "100%" }}>
				<Image src={path} wrapped ui={false} rounded style={{height: "500px"}}/>
				<Card.Content>
					<Card.Header>{contact.lastName+ " "+contact.firstName}</Card.Header>
					<Card.Meta>
						<span>Company: {contact.company}</span>
					</Card.Meta>
					<Card.Description>
						<span>Phone: {contact.phone}</span>
						<br />
						<span>Email: {contact.email}</span>
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<div className='ui two buttons'>
						<Button basic color='green'>
							<Link to={`/edit-contact/${contact.hash}`}>Edit</Link>
						</Button>
						<Button onClick={this.onDeleteClick.bind(this)} basic color='red'>Delete</Button>
					</div>
				</Card.Content>
			</Card >
		);
	}
}

ContactItem.propTypes = {
	deleteContact: PropTypes.func
};

export default connect(null, { deleteContact })(withRouter(ContactItem));