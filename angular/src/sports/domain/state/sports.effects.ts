import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RouterService } from "../../../router/router.service";
import { SportsService } from "../service/sports.service";
import { SportsQuery } from "../graphql/queries/sports-query";
import { SportByIdQuery } from "../graphql/queries/sport-by-id-query";
import { AddSportMutation } from "../graphql/mutations/add-sport-mutation";
import { UpdateSportMutation } from "../graphql/mutations/update-sport-mutation";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SPORT_CREATION_FORM_ID, SportCreationFormComponent } from "../../features/sport-creation-form/sport-creation-form.component";
import { CreateSport, Sport, UpdateSport } from "../../shared";
import { SportCreationActions, SportsGenericActions } from "./sports.actions";
import { filter, map, switchMap, take, tap } from "rxjs";
import { fetch, pessimisticUpdate } from '@nx/angular'
import { routerNavigatedAction } from "@ngrx/router-store";
import { FormsActions } from "../../../components/forms/form/state/form.actions";
import { SPORT_EDITION_FORM_ID, SportEditionFormComponent } from "../../features/sport-edition-form/sport-edition-form.component";
import { SPORTS_LIST_ID } from "../../features/sports-list/sports-list.component";
import { editRowButtonClicked } from "../../../components/lists/list/state/list.actions";
import { USER_EDITION_FORM_ID } from "../../../users/feature/user-edition-form/user-edition-form.component";

@Injectable()
export class SportsEffects {
    private createSportDialogRef : MatDialogRef<SportCreationFormComponent, CreateSport>;
    private editSportDialogRef : MatDialogRef<SportEditionFormComponent, UpdateSport>;

    /**
     * Initialize the sports module by requesting the list of sports to display.
     */
    public initSports$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SportsGenericActions.init),
            fetch({
                run: () => this.sportsQuery
                                .watch()
                                .valueChanges.pipe(
                                    map(result => SportsGenericActions.sportsListLoaded({
                                        sportsList: result.data.sports
                                    }))
                                ),
                onError: (action, error) => console.error(error)
            })
        ));
    
    /**
     * Opens the creation form when navigating to 'sports/new'
     */
    public navigateToUserCreationForm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigatedAction),
            switchMap(() => this.routerService.routerUrl$.pipe(take(1))),
            filter(url => url.includes('sports/new')),
            map(() => SportCreationActions.openCreationDialog({
                dialogConfig: {
                    id: SPORT_CREATION_FORM_ID,
                    width: '35%',
                    height: 'auto',
                    disableClose: true
                }
            }))
        ));
    
    
    /**
     * Opens the edition form when navigating to 'sports/sportId'
     * where sportId is the correlationId of an existing sport.
     */
    public navigateToSportEditionForm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigatedAction),
            switchMap(() => this.routerService.routerParams$.pipe(take(1))),
            filter(params => !!params['sportId']),
            fetch({
                run:(params) => this.sportByIdQuery.watch({
                    input: params['sportId']
                }).valueChanges.pipe(
                    take(1),
                    map(result => SportsGenericActions.editSportButtonClicked({
                        listId: SPORTS_LIST_ID,
                        data: result.data.sports[0]
                    }))
                ),
                onError: (action, error) => console.error(error)
            })
        ))

    /**
     * Opens the creation form dialog and navigates to the corresponding url.
     */
    public openUserCreationDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SportCreationActions.openCreationDialog),
            tap((action) => {
                this.createSportDialogRef = this.dialog.open(SportCreationFormComponent, action.dialogConfig);
                this.sportsService.navigate(['new'], true)})
        ),
        {dispatch: false});

    /**
     * Closes the creation form dialog and return to the root url.
     */
    public closeUserCreationDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormsActions.cancelFormRequested),
            filter(action => action.id === SPORT_CREATION_FORM_ID),
            tap((action) => {
                this.createSportDialogRef.close();
                this.sportsService.navigateToRoot()}),
        ),
        {dispatch: false});

    /**
     * Makes a graphql query to retrieve an specific sport when
     * clicking the edit button in the row list.
     */
    public editSportButtonClicked$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editRowButtonClicked),
            filter(action => action.listId === SPORTS_LIST_ID),
            tap((action) => this.sportsService.navigate([action.rowId], true)),
            fetch({
                run: (action) => this.sportByIdQuery.watch({
                    input: action.rowId
                }).valueChanges.pipe(
                    take(1),
                    map(result => SportsGenericActions.editSportButtonClicked({
                        listId: action.listId,
                        data: result.data.sports[0]
                    }))
                ),
                onError: (action, error) => console.error(error)
            })
        ))
    
    /**
     * opens the edition form dialog.
     */
    public openSportEditionDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SportsGenericActions.editSportButtonClicked),
            tap(action => {
                this.editSportDialogRef = this.dialog.open(SportEditionFormComponent, {
                    id: SPORT_EDITION_FORM_ID,
                    width: '35%',
                    height: 'auto',
                    disableClose: true,
                });
            })
        ),{dispatch: false})
    
    /**
     * Closes the edition form dialog.
     */
    public closeSportEditionDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormsActions.cancelFormRequested),
            filter(action => action.id === SPORT_EDITION_FORM_ID),
            tap(() => {
                this.editSportDialogRef.close();
                this.sportsService.navigateToRoot()
            })
        ), {dispatch: false})

    /**
     * Closes the dialog and request the creation of a sport
     * with given data.
     */
    public createSportRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormsActions.saveFormRequested),
            filter(form => form.id === SPORT_CREATION_FORM_ID),
            tap(() => this.createSportDialogRef.close()),
            map(action => SportCreationActions.createSportRequested({
                data: action.data as CreateSport
            }))
        ));
    
    /**
     * Execute a mutation to create a sport with given data.
     */    
    public createSport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SportCreationActions.createSportRequested),
            pessimisticUpdate({
                run: (action) => this.addSportMutation.mutate({input: action.data}).pipe(
                    map(({data}) => SportCreationActions.sportCreationSucceeded({
                        sport: data?.addSport as Sport
                    }))
                ),
                onError: (action, error) => console.error(error)
            })
        ));
    public updateSportList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                SportCreationActions.sportCreationSucceeded
            ),
            map((action) => SportsGenericActions.sportsListUpdated({
                sport: action.sport
            }))
        ));
    constructor(
        private readonly actions$: Actions,
        private readonly sportsService: SportsService,
        private readonly routerService: RouterService,
        private sportsQuery: SportsQuery,
        private sportByIdQuery: SportByIdQuery,
        private addSportMutation: AddSportMutation,
        private updateSportMutation: UpdateSportMutation,
        private dialog: MatDialog
    ){}
}