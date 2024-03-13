import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../shared";

export const UsersGenericActions = createActionGroup({
    source: "Users",
    events: {
        "Init": emptyProps(),
        "Users List Loaded": props<{usersList: User[]}>()
    }
})