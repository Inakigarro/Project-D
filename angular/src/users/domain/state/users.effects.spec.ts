import { TestBed, fakeAsync } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { UsersEffects } from './users.effects';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { UsersQuery } from '../graphql/queries/users-query';
import { User } from '../../shared';
import { hot } from 'jasmine-marbles';
import { UserCreationActions, UsersGenericActions } from './users.actions';
import { routerNavigatedAction } from '@ngrx/router-store';
import { RouterService } from '../../../router/router.service';
import { USER_CREATION_FORM_ID } from '../../feature/user-creation-form/user-creation-form.component';
import { USERS_LIST_ID } from '../../feature/user-list/user-list.component';
import { UserByIdQuery } from '../graphql/queries/user-by-id-query';
import { editRowButtonClicked } from '../../../components/lists/list/state/list.actions';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../services/users.service';


const user1: User = {
    correlationId: '1',
    displayName: 'test user',
    email: 'email@email.com'
}

function configureTestingModule(
    actions: Observable<Action>,
    routerUrl?: string
) {
    TestBed.configureTestingModule({
        imports: [ApolloTestingModule],
        providers: [
            MatDialog,
            UsersEffects,
            provideMockActions(() => actions),
            provideMockStore(),
            {
                provide: UsersQuery,
                useValue: {
                    watch: () => ({
                        valueChanges: of({
                            data: {
                                users: [user1]
                            }
                        })
                    })
                }
            },
            {
                provide: UserByIdQuery,
                useValue: {
                    watch: () => ({
                        valueChanges: of({
                            data: {
                                users: [user1]
                            }
                        })
                    })
                }
            },
            {
                provide: RouterService,
                useValue: {
                    routerParams$: of({
                        userId: '1'
                    }),
                    routerUrl$: of(routerUrl)
                } as Partial<RouterService>
            },
        ]
    });
}

describe('Users effects', () => {

    it('init should query the list of users and initialize the store', () => {
        // Arrange.
        let actions = hot('-a-|', {
            a: UsersGenericActions.init()
        });

        configureTestingModule(actions);
        let effects = TestBed.inject(UsersEffects);

        const expected = hot('-a-|', {
            a: UsersGenericActions.usersListLoaded({
                usersList: [user1]
            })
        });

        expect(effects.initUsers$).toBeObservable(expected);
    });
    it('navigate to userCreationForm should dispatch openCreationDialog', () => {
        let actions = hot('-a-|', {
            a: routerNavigatedAction
        });
        let routerUrl = 'users/new';

        configureTestingModule(actions, routerUrl);
        let effects = TestBed.inject(UsersEffects);

        let expected = hot('-a-|', {
            a: UserCreationActions.openCreationDialog({
                dialogConfig: {
                    id: USER_CREATION_FORM_ID,
                    width: '35%',
                    height: 'auto',
                    disableClose: true
                }
            })
        })
        expect(effects.navigateToUserCreationForm$).toBeObservable(expected);
    });
    it('navigate to userEditionForm should dispatch editUserButtonClicked', () => {
        let actions = hot('-a-|', {
            a: routerNavigatedAction
        });

        configureTestingModule(actions);
        let effects = TestBed.inject(UsersEffects);

        let expected = hot('-a-|', {
            a: UsersGenericActions.editUserButtonCliked({
                listId: USERS_LIST_ID,
                data: user1
            })
        });

        expect(effects.navigateToUsersEditionForm$).toBeObservable(expected);
    });
    it('editRowButtonClicked should dispatch editUserButtonClicked', () => {
        let actions = hot('-a-|', {
            a: editRowButtonClicked({
                listId: USERS_LIST_ID,
                rowId: user1.correlationId
            })
        })
        configureTestingModule(actions);
        let effects = TestBed.inject(UsersEffects);

        let expected = hot('-a-|', {
            a: UsersGenericActions.editUserButtonCliked({
                listId: USERS_LIST_ID,
                data: user1
            })
        });

        expect(effects.editUserButtonClicked$).toBeObservable(expected);
    });
    it('editUserButtonClicked should open edition dialog', fakeAsync(() => {
        let action = hot('-a-|', {
            a: UsersGenericActions.editUserButtonCliked({
                listId: USERS_LIST_ID,
                data: user1
            }) 
        });
        configureTestingModule(action);
        let dialog = TestBed.inject(MatDialog);
        spyOn(dialog, 'open')

        let effects = TestBed.inject(UsersEffects);
        effects.editUserButtonClicked$.subscribe(a => {
            expect(dialog.open).toHaveBeenCalled();
        });
    }))
});