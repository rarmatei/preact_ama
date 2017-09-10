import { Component } from "preact";
import { route } from "preact-router";
import Match from "preact-router/match";
import questionsService from "../../services/questions-service";
import Input from "../../components/input";
import Question from "../../components/question";
import {ReplaySubject} from "rxjs/ReplaySubject";
import "rxjs/add/operator/switchMap";

class Ask extends Component {

    constructor() {
        super();
        this.state = {
            userId: '',
            inputValue: '',
            questions: []
        };
        
        this.userId$
            .switchMap(id => {
                return questionsService.getQuestionsForUserId(id);
            })        
            .subscribe(questions => {
                this.setState({ questions });
            });
    }

    userId$ = new ReplaySubject(1);

    componentDidUpdate(prevProps, prevState) {
        if(prevState.userId !== this.state.userId) {
            this.userId$.next(this.state.userId);
        }
    }

    setUserId = (path) => {
        const userId = path.replace('/', '');
        this.setState({ userId });
    }

    submitQuestion = (question) => {
        if (question) {
            questionsService
                .addQuestion(question, this.state.userId);
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