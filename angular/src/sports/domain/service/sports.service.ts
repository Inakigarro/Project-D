import { Injectable } from "@angular/core";
import { SportState } from "../state/sports.reducer";
import { Action, Store } from "@ngrx/store";
import { NavigationService } from "../../../app/navigation.service";
import * as SportsSelectors from "../state/sports.selector";

@Injectable({
    providedIn: 'root'
})
export class SportsService {
    constructor(
        private store: Store<SportState>,
        private navigationService: NavigationService
    ){}

    public sportsLoaded$ = this.store.select(SportsSelectors.selectSportsLoaded);
    public sportsList$ = this.store.select(SportsSelectors.selectAllSports);
    public currentSport$ = this.store.select(SportsSelectors.selectCurrnteSport);

    public dispatch(action: Action) {
        this.store.dispatch(action);
    }

    public navigate(url: string[], isRelative: boolean = false){
        this.navigationService.navigate(url, isRelative);
    }

    public navigateToRoot() {
        this.navigate(['sports'], false);
    }
}