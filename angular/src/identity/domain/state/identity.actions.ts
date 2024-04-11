import { createAction, props } from "@ngrx/store";
import { LoginResponse, RegisterUser } from "../../models";

export const userRegisteredSuccessfuly = createAction(
    '[Identity register form] User registered successfuly',
    props<{userEmail: string}>()
)

export const userLoggedInSuccessfuly = createAction(
    '[Identity login form] User Logged In successfuly',
    props<{token: LoginResponse}>()
)