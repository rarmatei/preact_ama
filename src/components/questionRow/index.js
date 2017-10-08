import { Component } from 'preact';
import Question from '../question/index';
import Answer from '../answer/index';
import './style';

export default class QuestionRow extends Component {

    questionRowStyles = {
        display: "flex",
        flexDirection: "column"
    }
    
    rowStyles = {
        maxWidth: "70%",
        margin: "5px 0px 5px 0px"
    }
    
    questionStyles = {
        alignSelf: "flex-start"
    }
    answerStyles = {
        alignSelf: "flex-end"
    }

    render() {
        return (
            <div style={this.questionRowStyles}>
                <div style={{...this.rowStyles, ...this.questionStyles}}>
                    <Question onClick={this.props.onQuestionClick}>{this.props.question.ask}</Question>
                </div>
                <div style={{...this.rowStyles, ...this.answerStyles}}>
                    <Answer onClick={this.props.onAnswerClick}>{this.props.question.answer}</Answer>
                </div>
            </div>
        );
    }
}