import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Login from '../routes/login';
import Ask from '../routes/Ask';
import userProfileService from "../services/user-profile-service";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */

	constructor() {
		super();
		this.currUrl$ = new ReplaySubject(1);
		this.loggedIn$ = userProfileService.isLoggedIn();

		const routes = Observable
			.combineLatest(this.currUrl$, this.loggedIn$)
			.map(([currUrl, loggedIn]) => {
				debugger;
				if (loggedIn && currUrl === '/login') {
					return '/home';
				}
				if (!loggedIn && currUrl === '/home') {
					return '/login';
				}
			})
			.filter(Boolean);

		routes.subscribe(x => route(x));
	}

	handleRoute = e => {
		this.currUrl$.next(e.url);
	};
	currUrl$;
	loggedIn$;

	componentWillMount() {

	}

	render() {
		return (
			<div id="app">
				<Router onChange={this.handleRoute}>
					<Login path="/login" />
					<Home path="/home" />
					<Ask default />
				</Router>
			</div>
		);
	}
}
