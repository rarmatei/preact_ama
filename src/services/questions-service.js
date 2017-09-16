import firebase from "../firebase-config";
import { ReplaySubject } from "rxjs/ReplaySubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
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
                    this.questionsMap$.next(snapshot.val());
                });
            });
    }

    questions$ = new ReplaySubject(1);
    questionsMap$ = new ReplaySubject(1);

    getQuestionsForCurrentUser() {
        return userProfileService.getCurrentUser()
            .map(user => user.uid)
            .switchMap(this.getQuestionsForUserId);
    }

    getQuestionsForUserId = (userId) => {
        const userQuestions = userProfileService
            .getUserQuestionIds(userId);

        return Observable.combineLatest(
            userQuestions,
            this.questionsMap$,
            (questionIds, questions) => {
                return questionIds.reduce((subset, id) => {
                    return {
                        ...subset,
                        [id]: questions[id]
                    };
                }, {});
            })
            .map(this.generateQuestions);
    }

    addQuestion(questionString, userId) {
        const newQuestionRef = firebase
            .database()
            .ref('questions')
            .push({
                ask: questionString
            });
        const newQuestionId = newQuestionRef.key;
        userProfileService.addQuestion(userId, newQuestionId);
    }

    setAnswer(questionId, answer) {
        console.log(`${questionId} :: ${answer}`);
        firebase
            .database()
            .ref(`questions/${questionId}`)
            .update({ answer });
    }

    // private

    generateQuestions(firebaseQuestions) {
        debugger;
        return Object.keys(firebaseQuestions)
            .map(key => {
                const { ask, answer } = firebaseQuestions[key];
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