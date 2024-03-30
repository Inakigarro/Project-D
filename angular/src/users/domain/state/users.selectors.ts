import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USERS_FEATURE_KEY, UsersState } from "./users.reducer";
import { filter } from "rxjs";

export const getUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsersLoaded = createSelector(
    getUsersState,
    (state) => state.usersLoaded
);

export const selectUsersList = createSelector(
    getUsersState,
    state => state.usersList
);

export const selectCurrentUser = createSelector(
    getUsersState,
    state => state.currentUser
)