import axios from 'axios';
import { apiPrefix } from '../config.json';
import * as actionTypes from './actionTypes';

export function getContactsStart() {
	return {
		type: actionTypes.GET_CONTACTS_START,
	};
}

export function getContactsSuccess(contacts) {
	return {
		type: actionTypes.GET_CONTACTS_SUCCESS,
		contacts
	};
}

export function createNewContact(contact) {
	return {
		type: actionTypes.CREATE_NEW_CONTACT,
		contact
	};
}

export function deleteContactFromState(hash) {
	return {
		type: actionTypes.DELETE_CONTACT,
		hash
	};
}

export function getContacts(search) {
	return dispatch => {
		dispatch(getContactsStart());
		return axios.get(`${apiPrefix}/api/contacts`
			// , {			params: { search }}
		).then(response => {
			dispatch(getContactsSuccess(response.data));
		});
	}
}

// export function getContactsByParams(search) {
// 	return dispatch => {
// 		dispatch(getContactsStart());
// 		return axios.get(`${apiPrefix}`, {
// 			params: { search }
// 		}).then(response => {
// 			dispatch(getContactsSuccess(response.data));
// 		});
// 	}
// }

export function getContactByHash(hash) {
	return dispatch => {
		return axios.get(`${apiPrefix}/api/${hash}`);
	}
}

export function createContact(contactData) {
//	console.dir(contactData);
	return dispatch => {
		return axios.post(`${apiPrefix}/api/create`, contactData);
	}
}

export function updateContact(hash, contactData) {
//	console.dir(contactData);
	return dispatch => {
		return axios.patch(`${apiPrefix}/api/${hash}`, contactData);
	}
}

export function deleteContact(hash) {
	return dispatch => {
		return axios.delete(`${apiPrefix}/api/${hash}`)
			.then(res => {
				dispatch(deleteContactFromState(hash));
			});
	}
}