import { Component } from "@angular/core";
import { Store, createAction } from "@ngrx/store";

const initSports = createAction(
    '[Sports] Init'
)

@Component({
    selector: 'ig-sports',
    template: `<router-outlet></router-outlet>`
})
export class SportsRoutingComponent {
    constructor(private store: Store){
        this.store.dispatch(initSports())
    }
}