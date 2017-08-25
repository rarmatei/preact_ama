import firebase from "../firebase-config";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

class Service {

    static CURR_USER_KEY = 'currUser';

    constructor() {
        const currUser = this.storage.getItem(Service.CURR_USER_KEY);
        debugger;
        this.user$ = new BehaviorSubject(currUser);
        firebase.auth()
            .onAuthStateChanged((user) => {
                this.user$.next(user);
                if(user) {
                    this.storage.setItem('currUser', user);
                }
            });
        this.distinctUser$ = this.user$
            .distinctUntilChanged((prev, curr) => {
                debugger;
                return (prev && prev.uid) === (curr && curr.uid);
            });
    }


    storage = window.localStorage;
    user$;
    distinctUser$;

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
}

const userProfileService = new Service();
export default userProfileService;