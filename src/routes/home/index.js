import { h, Component } from 'preact';
import style from './style';
import Input from './../../components/input/index';
import QuestionRow from '../../components/questionRow/index';
import questionsService from '../../services/questions-service';

export default class Home extends Component {

	constructor() {
		super();
		this.state = {
			questions: []
		};

		questionsService.getQuestions()
			.subscribe(questions => {
				this.setState({questions});
			});
	}

	submitQuestion = (answer) => {
		console.log("in parent: " + answer);

	};

	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				{this.state.questions.map(question =>
					<QuestionRow question={question} />
				)}
				<Input submit={this.submitQuestion} />
			</div>
		);
	}
}
