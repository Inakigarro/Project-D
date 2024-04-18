import { Injectable } from "@angular/core";
import { IdentityService } from "../../identity.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FormsActions } from "../../../components/forms/form/state/form.actions";
import { filter, map, switchMap, take, tap } from "rxjs";
import { REGISTER_USER_FORM_ID } from "../../register/register-user.component";
import { LoginUser, RegisterUser } from "../../models";
import { userLogOutRequested, userLoggedInSuccessfuly, userRegisteredSuccessfuly } from "./identity.actions";
import { LOGIN_USER_FORM_ID } from "../../login/login.component";
import { NavigationService } from "../../../app/navigation.service";

@Injectable()
export class IdentityEffects {
    
    public registerUser$ = createEffect(() =>
        this.actions.pipe(
            ofType(FormsActions.saveFormRequested),
            filter(({id}) => id === REGISTER_USER_FORM_ID),
            tap(({data}) => this.identityService
                .register(data as RegisterUser))),
            {dispatch: false}
        );

    public loginUser$ = createEffect(() =>
        this.actions.pipe(
            ofType(FormsActions.saveFormRequested),
            filter(({id}) => id === LOGIN_USER_FORM_ID),
            tap(({data}) => this.identityService
                .login(data as LoginUser))),
                {dispatch: false}
        )
    
    public userLoggedIn$ = createEffect(() =>
        this.actions.pipe(
            ofType(userLoggedInSuccessfuly),
            tap(() => this.navigationService.navigate(['/'], false))
        ), {dispatch: false});

    public userLogOutRequested$ = createEffect(() =>
        this.actions.pipe(
            ofType(userLogOutRequested),
            tap(() => {
                this.navigationService.navigate(['identity', 'login'], false)
            })
        ), {dispatch: false})

    constructor(
        private readonly actions: Actions,
        private identityService: IdentityService,
        private navigationService: NavigationService,
    ) {}
}