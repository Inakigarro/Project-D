import { Injectable } from "@angular/core";
import { UsersState } from "../state/users.reducer";
import { Store, Action } from "@ngrx/store";
import * as UsersSelectors from "../state/users.selectors";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(
        private store: Store<UsersState>,
        private router: Router){}

    public usersLoaded$ = this.store.select(UsersSelectors.selectUsersLoaded);
    public usersList$ = this.store.select(UsersSelectors.selectUsersList);

    public dispatch(action: Action){
        this.store.dispatch(action)
    }

    public navigate(){
        
    }
}