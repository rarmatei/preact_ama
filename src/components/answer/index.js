import {Component} from 'preact';

export default class Answer extends Component {

    render() {
        return (
            <div onClick={this.props.onClick}>{this.props.children}</div>
        );
    }
}