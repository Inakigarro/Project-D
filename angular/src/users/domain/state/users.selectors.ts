import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USERS_FEATURE_KEY, UsersState } from "./users.reducer";

export const getUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsersLoaded = createSelector(
    getUsersState,
    (state) => state.usersLoaded
);

export const selectUsersList = createSelector(
    getUsersState,
    state => state.usersList
);