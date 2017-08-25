import {Component} from 'preact';
import Question from '../question/index';
import Answer from '../answer/index';

export default class QuestionRow extends Component {
    render() {
        return (
            <div>
                Q-ROW <br/>
                Question <br/>
                <Question>{this.props.question.ask}</Question>
                Answer <br/>
                <Answer>{this.props.question.answer}</Answer>
            </div>
        );
    }
}