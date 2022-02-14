import './index.css';
import store from './store/store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


let TextEditor = (state) => {

	ReactDOM.render(
		<BrowserRouter>
			<Provider store={store}>
				<App state={state} />
			</Provider>
		</BrowserRouter>, document.getElementById('root')
	);
}


TextEditor(store.getState());


