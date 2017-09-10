import {Component} from 'preact';
import Question from '../question/index';
import Answer from '../answer/index';

export default class QuestionRow extends Component {

    render() {
        return (
            <div>
                Q-ROW <br/>
                Question <br/>
                <Question onClick={this.props.onQuestionClick}>{this.props.question.ask}</Question>
                Answer <br/>
                <Answer onClick={this.props.onAnswerClick}>{this.props.question.answer}</Answer>
            </div>
        );
    }
}