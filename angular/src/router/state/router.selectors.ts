
import { RouterReducerState, getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const routerState =
  createFeatureSelector<RouterReducerState>('routerReducer');

export const {
  selectCurrentRoute,
  selectFragment,
  selectQueryParams,
  selectQueryParam,
  selectRouteParams,
  selectRouteParam,
  selectRouteData,
  selectRouteDataParam,
  selectUrl,
  selectTitle,
} = getRouterSelectors(routerState);

export const selectCurrentUrl = createSelector(
  routerState,
  selectUrl,
  (routerStateSnapshot) => routerStateSnapshot.state.url
);

export const selectCurrentParams = createSelector(
  routerState,
  selectRouteParams,
  (_, params) => params
);
