import firebase from "../firebase-config";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

class Service {

    static CURR_USER_KEY = 'currUser';

    constructor() {
        //TODO add logic to add new user to DB on first visit
        const storage = window.localStorage;
        const currUser = storage.getItem(Service.CURR_USER_KEY);
        const rawUser$ = new BehaviorSubject(currUser);
        firebase.auth()
            .onAuthStateChanged((user) => {
                rawUser$.next(user);
                storage.setItem('currUser', user);
            });
        this.user$ = rawUser$
            .distinctUntilChanged((prev, curr) => {
                return (prev && prev.uid) === (curr && curr.uid);
            });
    }

    user$;

    isLoggedIn() {
        return this.user$
            .map(Boolean);
    }

    getUser(userId) {
        //TODO implement this
    }

    getCurrentUser() {
        return this.user$;
    }

    getUserQuestionIds(userId) {
        return Observable.create(observer => {
            const ref = firebase.database()
                .ref(`users/${userId}`);
            const listener = ref
                .on('value', (snapshot) => {
                    const user = snapshot.val();
                    observer.next(user);
                });
            return () => {
                ref.off('value', listener);
            };
        })
            .map(user => user.questions)
            .map(Object.values);
    }

    addQuestion(userId, questionId) {
        firebase
            .database()
            .ref(`users/${userId}/questions`)
            .push(questionId);
    }
}

//TODO make User class and make both users and currUser use it

const userProfileService = new Service();
export default userProfileService;