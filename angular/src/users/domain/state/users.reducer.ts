import { Action, createReducer, on } from "@ngrx/store";
import { User } from "../../shared";
import { UsersGenericActions } from "./users.actions";

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
    usersLoaded: boolean;
    usersList: User[];
}

export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialState: UsersState = {
    usersLoaded: false,
    usersList: []
}

const reducer = createReducer(
    initialState,
    on(UsersGenericActions.usersListLoaded, (state, action) =>({
        ...state,
        usersLoaded: true,
        usersList: action.usersList
    }))
);

export function usersReducer(state: UsersState, action: Action){
    return reducer(state, action)
}