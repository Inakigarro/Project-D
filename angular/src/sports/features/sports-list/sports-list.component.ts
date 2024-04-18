import { Component } from "@angular/core";
import { Sport } from "../../shared";
import { SportsService } from "../../domain/service/sports.service";
import { MatDialog } from "@angular/material/dialog";
import { SportCreationActions } from "../../domain/state/sports.actions";
import { SPORT_CREATION_FORM_ID } from "../sport-creation-form/sport-creation-form.component";

export const SPORTS_LIST_ID = 'sports-list';

@Component({
    selector: 'ig-sports-list',
    templateUrl: './sports-list.component.html',
    styleUrl: './sports-list.component.scss'
})
export class SportsListComponent {
    public listId = SPORTS_LIST_ID;
    public listTitle = 'Sports';
    public listHeaders : (string & keyof Sport | 'buttons')[] = ['displayName', 'buttons'];
    public listData = this.sportsService.sportsList$;
    public loaded$ = this.sportsService.sportsLoaded$;

    constructor(
        private readonly sportsService: SportsService,
        public sportCreationDialog: MatDialog){}
    
    public openSportCreationDialog(){
        this.sportsService.dispatch(
            SportCreationActions.openCreationDialog({
                dialogConfig:{
                    id: SPORT_CREATION_FORM_ID,
                    width: '35%',
                    height: 'auto',
                    disableClose: true
                }
            })
        )
    }
}