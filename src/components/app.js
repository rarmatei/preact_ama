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
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/never';
import 'rxjs/add/operator/take';
import Spinner from 'react-spin';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */

	constructor() {
		super();
		this.state = {
			loginStatusKnown: false
		};
		this.currUrl$ = new ReplaySubject(1);
		const loggedIn$ = userProfileService.isLoggedIn();

		const routes = Observable
			.combineLatest(this.currUrl$, loggedIn$)
			.switchMap(([currUrl, loggedIn]) => {
				let routeValue;
				if (loggedIn && currUrl === '/login') {
					routeValue = '/home';
				}
				if (!loggedIn && currUrl === '/home') {
					routeValue = '/login';
				}
				return routeValue
					? Observable.of(routeValue)
					: Observable.never();
			});

		routes.subscribe(x => route(x));

		loggedIn$
			.take(1)
			.subscribe(_ => {
				this.setState({
					loginStatusKnown: true
				});
			});

	}

	handleRoute = e => {
		this.currUrl$.next(e.url);
	};

	currUrl$;

	render() {
		return (
			<div id="app">
				{
					this.state.loginStatusKnown
						? <Router onChange={this.handleRoute}>
							<Login path="/login" />
							<Home path="/home" />
							<Ask default />
						</Router>
						: <Spinner config={this.spinnerOpts} />
				}
			</div>
		);
	}

	// private

	spinnerOpts = {
		lines: 13 // The number of lines to draw
		, length: 56 // The length of each line
		, width: 8 // The line thickness
		, radius: 42 // The radius of the inner circle
		, scale: 1 // Scales overall size of the spinner
		, corners: 1 // Corner roundness (0..1)
		, color: '#000' // #rgb or #rrggbb or array of colors
		, opacity: 0 // Opacity of the lines
		, rotate: 0 // The rotation offset
		, direction: 1 // 1: clockwise, -1: counterclockwise
		, speed: 1.5 // Rounds per second
		, trail: 57 // Afterglow percentage
		, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
		, zIndex: 2e9 // The z-index (defaults to 2000000000)
		, className: 'spinner' // The CSS class to assign to the spinner
		, top: '49%' // Top position relative to parent
		, left: '50%' // Left position relative to parent
		, shadow: false // Whether to render a shadow
		, hwaccel: false // Whether to use hardware acceleration
		, position: 'absolute' // Element positioning
	};
}
