import { Injectable } from "@angular/core";
import { identityUri } from '../app/graphql.module';
import { LoginResponse, LoginUser, RegisterUser } from "./models";
import { HttpClient } from "@angular/common/http";
import { Action, Store } from "@ngrx/store";
import { userLogOutRequested, userLoggedInSuccessfuly, userRegisteredSuccessfuly } from "./domain/state/identity.actions";
import { getAccessToken, getExpirationTime, getRefreshtoken, getToken, getTokenType } from "./domain/state/identity.selectors";

@Injectable({
    providedIn: 'root'
})
export class IdentityService {
    public tokenType = this.store.select(getTokenType);
    public accessToken = this.store.select(getAccessToken);
    public expirationDate = this.store.select(getExpirationTime);
    public refreshtoken = this.store.select(getRefreshtoken);
    public composeToken = this.store.select(getToken);
    
    constructor(
        private httpClient: HttpClient,
        private store: Store,
    ) {}

    public register(registerUser: RegisterUser) {
        return this.httpClient
            .post<RegisterUser>(identityUri + 'register', registerUser)
            .subscribe(result => this.dispatch(userRegisteredSuccessfuly({
                userEmail: result.email
            })));
    }

    public login(data: LoginUser) {
        return this.httpClient
            .post<LoginResponse>(identityUri + 'login', data)
            .subscribe(
                result => {
                    this.dispatch(userLoggedInSuccessfuly({
                        token: result
                    }));

                    this.setToken(result);
                });
    }

    public logout() {
        this.dispatch(userLogOutRequested());
    }

    public dispatch(action: Action) {
        this.store.dispatch(action)
    }

    private setToken(token: LoginResponse) {
        window.sessionStorage.setItem("tokenType", token.tokenType);
        window.sessionStorage.setItem("accessToken", token.accessToken);
        window.sessionStorage.setItem("expireIn", token.expiresIn.toString());
        window.sessionStorage.setItem("refreshToken", token.refreshToken);
    }

    private removeToken() {
        window.sessionStorage.removeItem("tokenType");
        window.sessionStorage.removeItem("accessToken");
        window.sessionStorage.removeItem("expireIn");
        window.sessionStorage.removeItem("refreshToken");
    }
}