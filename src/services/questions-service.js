import firebase from "../firebase-config";
import { ReplaySubject } from "rxjs/ReplaySubject";
import 'rxjs/add/operator/map';
import userProfileService from './user-profile-service';

class Service {
    constructor() {
        const questionsRef = firebase
            .database()
            .ref('questions');

        userProfileService
            .getCurrentUser()
            .filter(Boolean)
            .subscribe(() => {
                questionsRef.on('value', (snapshot) => {
                    const questions = this.generateQuestions(snapshot.val());
                    this.questions$.next(questions);
                });
            });
    }

    questions$ = new ReplaySubject(1);

    //TODO change to getQuestionsForCurrUser
    getQuestions() {
        return this.questions$;
    }

    getQuestionsForUserId(userId) {

    }

    addQuestion(question, userId) {

    }

    setAnswer(questionId, answer) {
        console.log(`${questionId} :: ${answer}`);
        firebase
            .database()
            .ref(`questions/${questionId}`)
            .update({answer});
    }

    // private

    generateQuestions(firebaseQuestions) {
        return Object.keys(firebaseQuestions)
            .map(key => {
                const {ask, answer} = firebaseQuestions[key];
                return new Question(key, ask, answer);
            });
    }
}

//TODO move this model
class Question {

    constructor(id, ask, answer) {
        this.id = id;
        this.ask = ask;
        this.answer = answer;
    }

}

const questionsService = new Service();
export default questionsService;