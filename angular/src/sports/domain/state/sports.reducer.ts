import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Sport } from "../../shared";
import { Action, createReducer, on } from "@ngrx/store";
import { SportCreationActions, SportEditionActions, SportsGenericActions } from "./sports.actions";

export const SPORT_FEATURE_KEY = 'sports';

export interface SportState extends EntityState<Sport> {
    sportsLoaded: boolean,
    currentSport?: Sport
}

export function selectById(a: Sport): string {
    return a.correlationId
}

export function sortByName(a:Sport, b:Sport): number {
    return a.displayName.localeCompare(b.displayName);
}

export const sportsAdapter: EntityAdapter<Sport> = createEntityAdapter<Sport>({
    selectId: selectById,
    sortComparer: sortByName
});

export interface SportsPartialState {
    readonly [SPORT_FEATURE_KEY]: SportState;
}

export const initialState = sportsAdapter.getInitialState({
    sportsLoaded: false,
});

const reducer = createReducer(
    initialState,
    on(SportsGenericActions.sportsListLoaded, (state, action) => ({
        ...sportsAdapter.setAll(action.sportsList, state),
        sportsLoaded: true
    })),
    on(SportCreationActions.sportCreationSucceeded, (state) => ({
        ...state,
        sportsLoaded: false,
    })),
    on(SportsGenericActions.sportsListUpdated, (state, action) => ({
        ...sportsAdapter.upsertOne(action.sport, state),
        sportsLoaded: true
    })),
    on(SportsGenericActions.editSportButtonClicked, (state, action) => ({
        ...state,
        currentSport: action.data
    })),
    on(SportEditionActions.sportEditionSucceeded, (state) => ({
        ...state,
        sportsLoaded: false,
    })),
);

export function sportsReducer(state: SportState, action: Action){
    return reducer(state, action);
}