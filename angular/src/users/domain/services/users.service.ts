import { Injectable } from "@angular/core";
import { UsersState } from "../state/users.reducer";
import { Store } from "@ngrx/store";
import * as UsersSelectors from "../state/users.selectors";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private store: Store<UsersState>){}

    public usersLoaded$ = this.store.select(UsersSelectors.selectUsersLoaded);
    public usersList$ = this.store.select(UsersSelectors.selectUsersList);
}