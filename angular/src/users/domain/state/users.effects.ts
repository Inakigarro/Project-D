import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersQuery } from "../graphql/queries/users-query";
import { UserCreationAction, UsersGenericActions } from "./users.actions";
import { map } from "rxjs";
import { fetch, pessimisticUpdate } from '@nx/angular'
import { AddUserMutation } from "../graphql/mutations/add-user-mutation";
import { User } from "../../shared";

@Injectable()
export class UsersEffects {
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

    // public saveUser$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(UserCreationAction.saveButtonClicked),
    //         pessimisticUpdate({
    //             run: (action) =>
    //                 this.addUserMutation.mutate({input: action.createUser}).pipe(
    //                     map(({data}) => UserCreationAction.userCreationSucceeded({
    //                         user: data?.addUser as User
    //                     }))
    //                 ),
    //             onError: (action, error) => {
    //                 console.log(error)
    //             }
    //         })
    //     ))
    constructor(
        private readonly actions$: Actions,
        private usersQuery: UsersQuery,
        private addUserMutation: AddUserMutation){}
}