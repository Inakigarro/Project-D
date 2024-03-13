import { createActionGroup, emptyProps } from "@ngrx/store";

export const UsersGenericActions = createActionGroup({
    source: "Users",
    events: {
        "Init": emptyProps()
    }
})