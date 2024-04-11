import { Action, createReducer, on } from "@ngrx/store";
import { userLoggedInSuccessfuly } from "./identity.actions";

export const IDENTITY_FEATURE_ID = 'identity';

export interface IdentityState {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
}

export interface IdentityPartialState {
    readonly [IDENTITY_FEATURE_ID]: IdentityState
}

export const initialState : IdentityState = {
    tokenType: '',
    accessToken: '',
    expiresIn: 0,
    refreshToken: ''
}

export const identityReducer = createReducer(
    initialState,
    on(userLoggedInSuccessfuly, (state, action) => ({
        ...state,
        tokenType: action.token.tokenType,
        accessToken: action.token.accessToken,
        expiresIn: action.token.expiresIn,
        refreshToken: action.token.refreshToken,
    }))
);

export function reducer(state: IdentityState, action: Action){
    return identityReducer(state, action);
}