import firebase from "../firebase-config";
import { ReplaySubject } from "rxjs/ReplaySubject";
import 'rxjs/add/operator/map';

class Service {
    constructor() {
		const questionsRef = firebase
			.database()
			.ref('questions');

		questionsRef.on('value', (snapshot) => {
            const questions = Object.values(snapshot.val());
            this.questions$.next(questions);
		});
    }

    questions$ = new ReplaySubject(1);

    getQuestions() {
        return this.questions$;
    }

    getUserQuestions(userId) {

    }

    addQuestion(question) {
        
    }

    setAnswer(questionId, answer) {

    }


}

const questionsService = new Service();
export default questionsService;