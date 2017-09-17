import { h, Component } from 'preact';
import style from './style';
import Input from './../../components/input/index';
import QuestionRow from '../../components/questionRow/index';
import questionsService from '../../services/questions-service';

export default class Home extends Component {

	constructor() {
		super();
		this.state = {
			questions: [],
			showInput: false,
			inputValue: "",
			selectedQuestionId: undefined
		};
		questionsService.getQuestionsForCurrentUser()
			.subscribe(questions => {
				this.setState({questions});
			});
	}

	//TODO rename to submit answer
	submitQuestion = (answer) => {
		if(answer) {
			questionsService
				.setAnswer(this.state.selectedQuestionId, answer);
		}
		this.setState({
			showInput: false,
			inputValue: "",
			selectedQuestionId: undefined
		});
	};

	launchNewInput(questionId) {
		//TODO stop this is question already answered
		this.setState({
			showInput: true,
			inputValue: "",
			selectedQuestionId: questionId
		});
	}

	launchEditInput(questionId) {
		const question = this.state.questions
			.find(question => question.id === questionId);
		this.setState({
			showInput: true,
			inputValue: question.answer,
			selectedQuestionId: questionId
		});
	}

	//TODO show error message if empty/invalid answer provided

	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				{this.state.questions.map(question =>
					<QuestionRow question={question} 
								 onQuestionClick={this.launchNewInput.bind(this, question.id)}
								 onAnswerClick={this.launchEditInput.bind(this, question.id)}/>
				)}
				{
					this.state.showInput 
						? <Input value={this.state.inputValue} 
								 submit={this.submitQuestion} />
						: null
				}
				
			</div>
		);
	}
}
