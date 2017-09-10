import { Component } from "preact";
import { route } from "preact-router";
import Match from "preact-router/match";
import questionsService from "../../services/questions-service";
import Input from "../../components/input";
import Question from "../../components/question";

class Ask extends Component {

    constructor() {
        super();
        this.state = {
            userId: '',
            inputValue: '',
            questions: []
        };
        //TODO change to only get questions for this specific route user
        questionsService.getQuestions()
            .subscribe(questions => {
                this.setState({ questions });
            });
    }

    setUserId = (path) => {
        const userId = path.replace('/', '');
        this.setState({ userId });
    }

    submitQuestion = (question) => {
        if (question) {
            console.log(question);
        }
        this.setState({
            inputValue: ''
        });
    };

    render() {
        return (
            <div>
                {this.state.questions.map(question =>
                    <Question> {question.ask} </Question>
                )}
                <Input value={this.state.inputValue}
                    submit={this.submitQuestion} />
                <Match path="/">
                    {({ path }) => !this.state.userId && this.setUserId(path)}
                </Match>
            </div>
        );
    }
}

export default Ask;