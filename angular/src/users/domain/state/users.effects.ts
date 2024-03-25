import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersQuery } from "../graphql/queries/users-query";
import { UserCreationActions, UsersGenericActions } from "./users.actions";
import { filter, map, tap } from "rxjs";
import { fetch, pessimisticUpdate } from '@nx/angular'
import { AddUserMutation } from "../graphql/mutations/add-user-mutation";
import { CreateUser, User } from "../../shared";
import { FormsActions } from "../../../components/forms/form/state/form.actions";
import { USER_CREATION_FORM_ID, UserCreationFormComponent } from "../../feature/user-creation-form/user-creation-form.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Injectable()
export class UsersEffects {
    private dialogRef : MatDialogRef<UserCreationFormComponent, CreateUser>;
    
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

    public openUserCreationDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserCreationActions.openCreationDialog),
            tap((action) => this.dialogRef = this.dialog.open(UserCreationFormComponent, action.dialogConfig))
        ),
        {dispatch: false})
    
    public closeUserCreationDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormsActions.cancelFormRequested),
            filter(action => action.id === USER_CREATION_FORM_ID),
            tap((action) => this.dialogRef.close())
        ),
        {dispatch: false})

    public saveUserRequested$ = createEffect(() => 
        this.actions$.pipe(
            ofType(FormsActions.saveFormRequested),
            filter(form => form.id === USER_CREATION_FORM_ID),
            tap(() => this.dialogRef.close()),
            map(action => UserCreationActions.saveUserRequested({
                data: action.data as CreateUser
            }))
        ));

    public saveUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserCreationActions.saveUserRequested),
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
    
    public updateUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserCreationActions.userCreationSucceeded),
            map((action) => UsersGenericActions.usersListUpdated({
                user: action.user
            }))
        ));

    constructor(
        private readonly actions$: Actions,
        private usersQuery: UsersQuery,
        private addUserMutation: AddUserMutation,
        private dialog: MatDialog){}
}