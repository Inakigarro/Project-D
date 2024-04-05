import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersQuery } from "../graphql/queries/users-query";
import { UserCreationActions, UserEditionActions, UsersGenericActions } from "./users.actions";
import { filter, map, switchMap, take, tap } from "rxjs";
import { fetch, pessimisticUpdate } from '@nx/angular'
import { AddUserMutation } from "../graphql/mutations/add-user-mutation";
import { CreateUser, UpdateUser, User } from "../../shared";
import { FormsActions } from "../../../components/forms/form/state/form.actions";
import { USER_CREATION_FORM_ID, UserCreationFormComponent } from "../../feature/user-creation-form/user-creation-form.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UsersService } from "../services/users.service";
import { USER_EDITION_FORM_ID, UserEditionFormComponent } from "../../feature/user-edition-form/user-edition-form.component";
import { editRowButtonClicked } from "../../../components/lists/list/state/list.actions";
import { USERS_LIST_ID } from "../../feature/user-list/user-list.component";
import { UserByIdQuery } from "../graphql/queries/user-by-id-query";
import { UpdateUserMutation } from "../graphql/mutations/update-user-mutation";
import { routerNavigatedAction } from "@ngrx/router-store";
import { RouterService } from "../../../router/router.service";

@Injectable()
export class UsersEffects {
    private createUserDialogRef : MatDialogRef<UserCreationFormComponent, CreateUser>;
    private editUserDialogRef : MatDialogRef<UserEditionFormComponent, UpdateUser>;

    /**
     * Initialize the users module by requesting the list of users to display.
     */
    public initUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersGenericActions.init),
            fetch({
                run: () => this.usersQuery
                                .watch()
                                .valueChanges.pipe(
                                    map(result => UsersGenericActions.usersListLoaded({
                                        usersList: result.data.users
                                    }))
                                ),
                onError: (_, error) => console.log(error)
            })
        ));

    /**
     * Opens the creation form when navigating to 'users/new'
     */
    public navigateToUserCreationForm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigatedAction),
            switchMap(() => this.routerService.routerUrl$.pipe(take(1))),
            filter(url => url.includes('users/new')),
            map(() => UserCreationActions.openCreationDialog({
                dialogConfig: {
                    id: USER_CREATION_FORM_ID,
                    width: '35%',
                    height: 'auto',
                    disableClose: true
                }
            }))
        ));
    
    /**
     * Opens the edition form when navigating to 'user/userId'
     * where userId is the correlationId of an existing user.
     */
    public navigateToUsersEditionForm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigatedAction),
            switchMap(() => this.routerService.routerParams$.pipe(take(1))),
            filter(params => !!params['userId']),
            fetch({
                run: (params) => this.userByIdQuery.watch({
                    input: params['userId']
                }).valueChanges.pipe(
                    take(1),
                    map(result => UsersGenericActions.editUserButtonCliked({
                        listId: USERS_LIST_ID,
                        data: result.data.users[0]
                    }))
                ),
                onError: (data, error) => console.log(error)
            })
        ))

    /**
     * Opens the creation form dialog and navigates to the corresponding url.
     */
    public openUserCreationDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserCreationActions.openCreationDialog),
            tap((action) => {
                this.createUserDialogRef = this.dialog.open(UserCreationFormComponent, action.dialogConfig);
                this.usersService.navigate(['new'], true)})
        ),
        {dispatch: false})
    
    /**
     * Closes the creation form dialog and return to the root url.
     */
    public closeUserCreationDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormsActions.cancelFormRequested),
            filter(action => action.id === USER_CREATION_FORM_ID),
            tap((action) => {
                this.createUserDialogRef.close();
                this.usersService.navigateToRoot()}),
        ),
        {dispatch: false})

    /**
     * Makes a graphql query to retrieve an specific user when
     * clicking the edit button in the row list.
     */
    public editUserButtonClicked$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editRowButtonClicked),
            filter(action => action.listId === USERS_LIST_ID),
            tap((action) => this.usersService.navigate([action.rowId], true)),
            fetch({
                run: (action) => this.userByIdQuery.watch({
                    input: action.rowId
                }).valueChanges.pipe(
                    take(1),
                    map(result => UsersGenericActions.editUserButtonCliked({
                        listId: action.listId,
                        data: result.data.users[0]
                    }))
                )
            })));
    
    /**
     * Opens the edition form dialog.
     */
    public openUserEditionDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersGenericActions.editUserButtonCliked),
            tap(action => {
                this.editUserDialogRef = this.dialog.open(UserEditionFormComponent, {
                    id: USER_EDITION_FORM_ID,
                    width: '35%',
                    height: 'auto',
                    disableClose: true,
                });
            })
        ), {dispatch: false});
    
    /**
     * Closes the edition form dialog.
     */
    public closeUserEditionDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormsActions.cancelFormRequested),
            filter(action => action.id === USER_EDITION_FORM_ID),
            tap((action) => this.editUserDialogRef.close()),
            tap(() => this.usersService.navigateToRoot())
        ),
        {dispatch: false})

    /**
     * Closes the dialog and request the creation of a user
     * with given data.
     */
    public createUserRequested$ = createEffect(() => 
        this.actions$.pipe(
            ofType(FormsActions.saveFormRequested),
            filter(form => form.id === USER_CREATION_FORM_ID),
            tap(() => this.createUserDialogRef.close()),
            map(action => UserCreationActions.createUserRequested({
                data: action.data as CreateUser
            }))
        ));

    /**
     * Closes the dialog and request the edition of a user
     * with given data.
     */
    public editUserRequested$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormsActions.saveFormRequested),
            filter(form => form.id === USER_EDITION_FORM_ID),
            tap(() => this.editUserDialogRef.close()),
            tap(() => this.usersService.navigateToRoot()),
            map(action => UserEditionActions.editUserRequested({
                data: action.data as UpdateUser
            }))
        ))

    /**
     * Execute a mutation to create a user with given data.
     */
    public createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserCreationActions.createUserRequested),
            pessimisticUpdate({
                run: (action) =>
                    this.addUserMutation.mutate({input: action.data}).pipe(
                        map(({data}) => UserCreationActions.userCreationSucceeded({
                            user: data?.addUser as User
                        }))
                    ),
                onError: (action, error) => console.log(error)
            })
        ));
    
    /**
     * Execute a mutation to update a user with given data.
     */
    public updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserEditionActions.editUserRequested),
            pessimisticUpdate({
                run: (action) =>
                    this.updateUserMutation.mutate({input: action.data}).pipe(
                        map(({data}) => UserEditionActions.userEditionSucceeded({
                            user: data?.updateUser as User
                        }))
                    ),
                onError: (action, error) => console.log(error)
            })
        ))
    
    /**
     * After a creation or edition is completed, updates the users
     * list with the given user.
     */
    public updateUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                UserCreationActions.userCreationSucceeded,
                UserEditionActions.userEditionSucceeded),
            map((action) => UsersGenericActions.usersListUpdated({
                user: action.user
            }))
        ));

    constructor(
        private readonly actions$: Actions,
        private readonly usersService: UsersService,
        private readonly routerService: RouterService,
        private usersQuery: UsersQuery,
        private userByIdQuery: UserByIdQuery,
        private addUserMutation: AddUserMutation,
        private updateUserMutation: UpdateUserMutation,
        private dialog: MatDialog){}
}