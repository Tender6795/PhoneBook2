import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import rootReducer from './reducers/rootReducer';
import { setCurrentUser } from './actions/authActions';
import setAuthorizationToken from './utils/setAuthorizationToken';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(reduxThunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ ?
		 window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
);

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('app'));