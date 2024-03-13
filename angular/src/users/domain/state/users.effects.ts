import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersQuery } from "../graphql/queries/users-query";
import { UsersGenericActions } from "./users.actions";
import { map } from "rxjs";
import { fetch } from '@nx/angular'

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
    constructor(
        private readonly actions$: Actions,
        private usersQuery: UsersQuery){}
}