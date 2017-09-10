import firebase from "../firebase-config";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {ReplaySubject} from "rxjs/ReplaySubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

class Service {

    static CURR_USER_KEY = 'currUser';

    constructor() {
        //TODO add logic to add new user to DB on first visit
        const currUser = this.storage.getItem(Service.CURR_USER_KEY);
        this.user$ = new BehaviorSubject(currUser);
        this.allUsers$ = new ReplaySubject();
        firebase.auth()
            .onAuthStateChanged((user) => {
                this.user$.next(user);
                if(user) {
                    this.storage.setItem('currUser', user);
                }
            });
        this.distinctUser$ = this.user$
            .distinctUntilChanged((prev, curr) => {
                return (prev && prev.uid) === (curr && curr.uid);
            });
        firebase.database()
            .ref('users')
            .on('value', (snapshot) => {
                const users = snapshot.val();
                this.allUsers$.next(users);
            });
    }


    storage = window.localStorage;
    user$;
    distinctUser$;
    allUsers$;

    isLoggedIn() {
        return this.distinctUser$
            .map(Boolean);
    }

    getUser(userId) {
        //TODO implement this
    }

    getCurrentUser() {
        return this.distinctUser$;
    }

    getUserQuestionIds(userId) {
        return this.allUsers$
            .map(users => users[userId].questions)
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