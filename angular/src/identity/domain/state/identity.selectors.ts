import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IDENTITY_FEATURE_ID, IdentityState } from "./identity.reducer";

export const getIdentityState = createFeatureSelector<IdentityState>(IDENTITY_FEATURE_ID);

export const getTokenType = createSelector(
    getIdentityState,
    state => state.tokenType
);

export const getAccessToken = createSelector(
    getIdentityState,
    state => state.accessToken
);

export const getExpirationTime = createSelector(
    getIdentityState,
    state => state.expiresIn
);

export const getRefreshtoken = createSelector(
    getIdentityState,
    state => state.refreshToken
);

export const getToken = createSelector(
    getTokenType,
    getAccessToken,
    (type, token) => `${type} ${token}`
)