import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CreateUser, User } from "../../shared";
import { MatDialogConfig } from "@angular/material/dialog";

export const UsersGenericActions = createActionGroup({
    source: "Users",
    events: {
        "Init": emptyProps(),
        "Users List Loaded": props<{usersList: User[]}>(),
        "Users List Updated": props<{user: User}>(),
        "New User button clicked": emptyProps(),
        "Edit User button cliked": props<{listId: string; data: User}>()
    }
})

export const UserCreationActions = createActionGroup({
    source: "User Creation form",
    events: {
        "Open creation dialog": props<{dialogConfig: MatDialogConfig}>(),
        "Save user requested": props<{data: CreateUser}>(),
        "User creation succeeded": props<{user: User}>(),
    }
})