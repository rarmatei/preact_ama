import { Component } from 'preact';
import firebase from "../../firebase-config";
import { route } from "preact-router";

export default class Home extends Component {

    constructor() {
        super();
    }
    //question where do I bind my methods to avoid the .this issue
    //question how can I create a login/user service to solve my issue with passing the username around
    login() {
        firebase.auth()
        .signInAnonymously();
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <p>Please login</p>
                <button onClick={this.login}> Login </button>
            </div>
        );
    }

    //TIP you can use class={style.whatever} to style react components
}
