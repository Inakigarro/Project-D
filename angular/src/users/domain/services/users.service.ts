import { Injectable } from "@angular/core";
import { UsersState } from "../state/users.reducer";
import { Store, Action } from "@ngrx/store";
import * as UsersSelectors from "../state/users.selectors";
import { Router } from "@angular/router";
import { NavigationService } from "../../../app/navigation.service";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(
        private store: Store<UsersState>,
        private router: Router,
        private navigationService: NavigationService){}

    public usersLoaded$ = this.store.select(UsersSelectors.selectUsersLoaded);
    public usersList$ = this.store.select(UsersSelectors.selectAllUsers);
    public currentUser$ = this.store.select(UsersSelectors.selectCurrentUser);

    public dispatch(action: Action){
        this.store.dispatch(action)
    }

    public navigate(url: string[], isRelative: boolean = false){
        this.navigationService.navigate(url, isRelative)
    }

    public navigateToRoot() {
        this.navigate(['users'], false)
    }
}