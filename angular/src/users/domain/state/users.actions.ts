import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CreateUser, UpdateUser, User } from "../../shared";
import { MatDialogConfig } from "@angular/material/dialog";

export const UsersGenericActions = createActionGroup({
    source: "Users",
    events: {
        "Init": emptyProps(),
        "Users List Loaded": props<{usersList: User[]}>(),
        "Users List Updated": props<{user: User}>(),
        "Update user in list": props<{usersList: User[], user: User}>(),
        "New User button clicked": emptyProps(),
        "Edit User button cliked": props<{listId: string; data: User}>()
    }
})

export const UserCreationActions = createActionGroup({
    source: "User Creation form",
    events: {
        "Open creation dialog": props<{dialogConfig: MatDialogConfig}>(),
        "Create user requested": props<{data: CreateUser}>(),
        "User creation succeeded": props<{user: User}>(),
    }
});

export const UserEditionActions = createActionGroup({
    source: "User Edition form",
    events: {
        "Open edition dialog": props<{dialogConfig: MatDialogConfig}>(),
        "Edit user requested": props<{data: UpdateUser}>(),
        "User edition succeeded": props<{user: User}>()
    }
})