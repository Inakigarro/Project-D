import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RouterSelectors from './state/router.selectors';

@Injectable({
    providedIn: 'root'
})
export class RouterService {
  constructor(private store$: Store) {}
  public routerUrl$ = this.store$.select(RouterSelectors.selectCurrentUrl);
  public routerParams$ = this.store$.select(
    RouterSelectors.selectCurrentParams
  );
}