import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CreateUser, User } from "../../shared";

export const UsersGenericActions = createActionGroup({
    source: "Users",
    events: {
        "Init": emptyProps(),
        "Users List Loaded": props<{usersList: User[]}>(),
        "New User button clicked": emptyProps()
    }
})

export const UserCreationAction = createActionGroup({
    source: "User Creation form",
    events: {
        "Save button clicked": props<{createUser: CreateUser}>(),
        "User creation succeeded": props<{user: User}>(),
    }
})