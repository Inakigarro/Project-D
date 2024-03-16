import { Injectable } from "@angular/core";
import { Mutation, gql } from "apollo-angular";
import { CreateUser, User } from "../../../shared";

export interface AddUserResponse {
    addUser : User
}

@Injectable({
    providedIn: 'root'
})
export class AddUserMutation extends Mutation <
    AddUserResponse,
    {
        input: CreateUser
    }>{
    public override document = gql`
        mutation addUser($input: CreateUserInput!){
            addUser(createUser: $input) {
                correlationId
                displayName
                email
            }
        }`
}