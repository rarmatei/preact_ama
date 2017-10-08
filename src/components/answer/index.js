import {Component} from 'preact';
import style from "./style";

export default class Answer extends Component {

    render() {
        return (
            <div class={style.answer} onClick={this.props.onClick}>{this.props.children}</div>
        );
    }
}