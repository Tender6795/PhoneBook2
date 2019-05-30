import * as actionTypes from '../actions/actionTypes';

const initialState = ({
	loading: false,
	contacts: []
});

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_CONTACTS_SUCCESS:
			return {
				loading: false,
				contacts: action.contacts
			};
		case actionTypes.GET_CONTACTS_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.CREATE_NEW_CONTACT:
			return {
				...state,
				contacts: [...state.contacts, action.contact]
			};
		case actionTypes.DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(c => c.hash !== action.hash)
			};
		default:
			return state;
	}
};