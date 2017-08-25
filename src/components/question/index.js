import {Component} from 'preact';

export default class Question extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}