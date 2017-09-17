import firebase from "../firebase-config";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
import memoize from "lodash/memoize";

class Service {

    static CURR_USER_KEY = 'currUser';

    constructor() {
        const rawUser$ = new ReplaySubject(1);
        firebase.auth()
            .onAuthStateChanged((user) => {
                rawUser$.next(user);
            });
        this.user$ = rawUser$
            .distinctUntilChanged((prev, curr) => {
                return (prev && prev.uid) === (curr && curr.uid);
            });
    }

    //TODO create database security rules

    user$;

    isLoggedIn() {
        return this.user$
            .map(Boolean);
    }

    getUser(userId) {
        if (!userId) {
            return Observable.of(undefined);
        }
        return Observable.create(observer => {
            const ref = this.userRef(userId);
            const listener = ref.on('value', (snapshot) => {
                observer.next(snapshot.val());
            });
            return () => {
                ref.off('value', listener);
            };
        });
    }

    getCurrentUser() {
        return this.user$;
    }

    getUserQuestionIds(userId) {
        return Observable
            .create(observer => {
                const ref = this.userRef(userId).child('questions');
                const listener = ref
                    .on('value', (snapshot) => {
                        const questions = snapshot.val();
                        observer.next(
                            questions
                                ? questions
                                : {}
                        );
                    });
                return () => {
                    ref.off('value', listener);
                };
            })
            .map(Object.values);
    }

    addQuestion(userId, questionId) {
        this.userRef(userId)
            .child('questions')
            .push(questionId);
    }
s
    //private

    userRef = memoize((userId) => {
        return firebase
            .database()
            .ref(`users/${userId}`);
    });
}

//TODO make User class and make both users and currUser use it

const userProfileService = new Service();
export default userProfileService;