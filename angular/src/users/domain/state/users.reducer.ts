import { Action, createReducer, on } from "@ngrx/store";
import { User } from "../../shared";
import { UserCreationActions, UserEditionActions, UsersGenericActions } from "./users.actions";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<User> {
    usersLoaded: boolean,
    currentUser?: User
}

export function selectById(a: User): string {
    //In this case this would be optional since primary key is id
    return a.correlationId;
}

export function sortByName(a: User, b: User): number {
    return a.displayName.localeCompare(b.displayName);
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: selectById,
    sortComparer: sortByName
});

export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialState = usersAdapter.getInitialState({
    usersLoaded: false,
});

const reducer = createReducer(
    initialState,
    on(UsersGenericActions.usersListLoaded, (state, action) => ({
        ...usersAdapter.setAll(action.usersList, state),
        usersLoaded: true
    })),
    on(UserCreationActions.userCreationSucceeded, state =>({
        ...state,
        usersLoaded: false,
    })),
    on(UsersGenericActions.usersListUpdated, (state, action) => ({
        ...usersAdapter.upsertOne(action.user, state),
        usersLoaded: true
    })),
    on(UsersGenericActions.editUserButtonCliked, (state, action) => ({
        ...state,
        currentUser: action.data
    })),
    on(UserEditionActions.userEditionSucceeded, (state, action) => ({
        ...state,
        usersLoaded: false
    })),
);

export function usersReducer(state: UsersState, action: Action){
    return reducer(state, action)
}