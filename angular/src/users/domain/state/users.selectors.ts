import { createFeatureSelector, createSelector } from "@ngrx/store";
import { 
    USERS_FEATURE_KEY,
    UsersState,
    usersAdapter } from "./users.reducer";

const adapterSelectors = usersAdapter.getSelectors();

export const getUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsersIds = createSelector(
    getUsersState,
    adapterSelectors.selectIds
);

export const selectUsersEntities = createSelector(
    getUsersState,
    adapterSelectors.selectEntities
);

export const selectAllUsers = createSelector(
    getUsersState,
    adapterSelectors.selectAll
)

export const selectUsersLoaded = createSelector(
    getUsersState,
    (state) => state.usersLoaded
);

export const selectCurrentUser = createSelector(
    getUsersState,
    state => state.currentUser
)