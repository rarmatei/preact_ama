import {Component} from 'preact';
import style from "./style";

export default class Question extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div class={style.question} onClick={this.props.onClick}>{this.props.children}</div>
        );
    }
}