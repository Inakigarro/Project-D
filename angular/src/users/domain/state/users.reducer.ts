import { Action, createReducer, on } from "@ngrx/store";
import { User } from "../../shared";
import { UserCreationActions, UserEditionActions, UsersGenericActions } from "./users.actions";

export const USERS_FEATURE_KEY = 'users';

function updateUserList(list: User[], user: User) {
    let newList = [...list];
    let index = newList.findIndex(u => u.correlationId === user.correlationId);
    newList[index] = {
        ...newList[index],
        displayName: user.displayName,
        email: user.email
    }
    return newList;
}

export interface UsersState {
    usersLoaded: boolean;
    usersList: User[];
    currentUser?: User;
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
    })),
    on(UsersGenericActions.editUserButtonCliked, (state, action) => ({
        ...state,
        currentUser: action.data
    })),
    on(UserEditionActions.userEditionSucceeded, (state, action) => ({
        ...state,
        usersLoaded: false
    })),
    on(UsersGenericActions.updateUserInList, (state, action) => ({
        ...state,
        usersLoaded: true,
        usersList: updateUserList(action.usersList, action.user)
    }))
);

export function usersReducer(state: UsersState, action: Action){
    return reducer(state, action)
}