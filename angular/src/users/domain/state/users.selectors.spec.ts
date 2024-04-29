import { User } from "../../shared";
import { UsersState, initialState, usersAdapter } from "./users.reducer";
import { selectAllUsers, selectCurrentUser, selectUsersEntities, selectUsersIds, selectUsersLoaded } from "./users.selectors";

const user1: User = {
    correlationId: '1',
    displayName: 'test user 1',
    email: 'email1@email.com'
};

const user2: User = {
    correlationId: '2',
    displayName: 'test user 2',
    email: 'email2@email.com'
};

const users: User[] = [user1, user2];

describe('Users selectors', () => {
    it('selectUsersIds should return an array of users correlationIds', () => {
        // Arrange.
        const state = usersAdapter.setAll(users, initialState);

        // Act.
        const result = selectUsersIds.projector(state);

        // Assert.
        expect(result).toBeTruthy();
        expect(result).toContain(user1.correlationId);
        expect(result).toContain(user2.correlationId);
    });
    it('selectUsersEntities should return a dictionary of users', () => {
        // Arrange.
        const state = usersAdapter.setAll(users, initialState);

        // Act.
        const result = selectUsersEntities.projector(state);

        // Assert.
        expect(result).toBeTruthy();
        expect(result[user1.correlationId]).not.toBeNull();
        expect(result[user1.correlationId]).toBe(user1);
        expect(result[user2.correlationId]).not.toBeNull();
        expect(result[user2.correlationId]).toBe(user2);
    });
    it('selectAllUsers should return an array of users', () => {
        // Arrange.
        const state = usersAdapter.setAll(users, initialState);

        // Act.
        const result = selectAllUsers.projector(state);

        // Assert.
        expect(result).toBeTruthy();
        expect(result).toContain(user1);
        expect(result).toContain(user2);
    });
    it('selectUsersLoaded should return false', () => {
        // Act.
        const result = selectUsersLoaded.projector(initialState);

        // Assert.
        expect(result).toBeFalse()
    });
    it('selectCurrentUsers should return the current user.', () => {
        // Arrange.
        const state: UsersState = { ...initialState, currentUser: user1 };

        // Act.
        const result = selectCurrentUser.projector(state);

        expect(result).toBeTruthy();
        expect(result).toBe(user1);
    })
});