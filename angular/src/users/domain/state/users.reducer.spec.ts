import { USERS_LIST_ID } from "../../feature/user-list/user-list.component";
import { User } from "../../shared";
import { UserCreationActions, UserEditionActions, UsersGenericActions } from "./users.actions";
import { UsersState, initialState, usersReducer } from "./users.reducer";

const user : User = {
    correlationId: '1',
    displayName: 'test user',
    email: 'email@email.com'
}

describe('Users reducer', () => {
    it('userListLoaded should set user list and usersLoaded true', () => {
        // Arrange.
        const action = UsersGenericActions.usersListLoaded({
            usersList: [user]
        });

        // Act.
        const result: UsersState = usersReducer(initialState, action);

        // Assert.
        expect(result.ids).toContain(user.correlationId);
        expect(result.entities[user.correlationId]).not.toBeNull();
        expect(result.entities[user.correlationId]).toBe(user);
    });
    it('userCreationSucceeded should set usersLoaded false', () => {
        // Arrange.
        const action = UserCreationActions.userCreationSucceeded({
            user: user
        });

        // Act.
        const result = usersReducer({...initialState, usersLoaded: true}, action);

        // Assert.
        expect(result.usersLoaded).toBeFalse();
    });
    it('usersListUpdated should upsert a user and set users loaded true', () => {
        // Arrange.
        const action = UsersGenericActions.usersListUpdated({
            user: user
        });

        // Act.
        const result = usersReducer(initialState, action);

        expect(result.usersLoaded).toBeTrue();
        expect(result.ids).toContain(user.correlationId);
        expect(result.entities[user.correlationId]).toBe(user);
    });
    it('editUserButtonClicked should set current user', () => {
        // Arrange.
        const action = UsersGenericActions.editUserButtonCliked({
            data: user,
            listId: USERS_LIST_ID
        });

        // Act.
        const result: UsersState = usersReducer(initialState, action);

        // Assert.
        expect(result.currentUser).not.toBeNull();
        expect(result.currentUser).toBe(user);
    });
    it('userEditionSucceeded should set usersLoaded false', () => {
        // Arrange.
        const action = UserEditionActions.userEditionSucceeded({
            user: user
        });

        const state: UsersState = {
            ...initialState,
            usersLoaded: true
        };

        // Act.
        const result = usersReducer(state, action);

        // Assert.
        expect(result.usersLoaded).toBeFalse();
    });
})