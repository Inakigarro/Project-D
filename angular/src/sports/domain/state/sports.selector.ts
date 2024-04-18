import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SPORT_FEATURE_KEY, SportState, sportsAdapter } from "./sports.reducer";

const adapterSelectors = sportsAdapter.getSelectors();

export const getSportsState = createFeatureSelector<SportState>(SPORT_FEATURE_KEY);

export const selectSportsIds = createSelector(
    getSportsState,
    adapterSelectors.selectIds
);

export const selectSportsEntities = createSelector(
    getSportsState,
    adapterSelectors.selectEntities
);

export const selectAllSports = createSelector(
    getSportsState,
    adapterSelectors.selectAll
);

export const selectSportsLoaded = createSelector(
    getSportsState,
    state => state.sportsLoaded
);

export const selectCurrnteSport = createSelector(
    getSportsState,
    state => state.currentSport
);