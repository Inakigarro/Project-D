import { Injectable } from "@angular/core";
import { identityUri } from '../app/graphql.module';
import { LoginResponse, LoginUser, RegisterUser } from "./models";
import { HttpClient } from "@angular/common/http";
import { Action, Store } from "@ngrx/store";
import { userLoggedInSuccessfuly, userRegisteredSuccessfuly } from "./domain/state/identity.actions";

@Injectable({
    providedIn: 'root'
})
export class IdentityService {
    
    constructor(
        private httpClient: HttpClient,
        private store: Store,
    ) {}
    public register(registerUser: RegisterUser){
        return this.httpClient
            .post<RegisterUser>(identityUri + 'register', registerUser)
            .subscribe(result => this.dispatch(userRegisteredSuccessfuly({
                userEmail: result.email
            })));
    }
    public login(data: LoginUser){
        return this.httpClient
            .post<LoginResponse>(identityUri + 'login', data)
            .subscribe(result => this.dispatch(userLoggedInSuccessfuly({
            token: result
        })));
    }

    public dispatch(action: Action){
        this.store.dispatch(action)
    }
}