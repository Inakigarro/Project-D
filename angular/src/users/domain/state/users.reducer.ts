import { Action, createReducer, on } from "@ngrx/store";
import { User } from "../../shared";
import { UserCreationActions, UsersGenericActions } from "./users.actions";

export const USERS_FEATURE_KEY = 'users';

function addUserOrdered(list: User[], user: User){
    let updatedList = list.concat(user);

    return updatedList.sort((a, b)=> {
        if (a.correlationId < b.correlationId){
            return 1
        }
        if (a.correlationId > b.correlationId){
            return -1
        }
        return 0
    });
}

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
    })),
    on(UserCreationActions.userCreationSucceeded, state =>({
        ...state,
        usersLoaded: false,
    })),
    on(UsersGenericActions.usersListUpdated, (state, action) => ({
        ...state,
        usersLoaded: true,
        usersList: state.usersList.concat(action.user)
    }))
);

export function usersReducer(state: UsersState, action: Action){
    return reducer(state, action)
}