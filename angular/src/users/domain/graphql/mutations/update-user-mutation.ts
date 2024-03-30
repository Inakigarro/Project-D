import { Injectable } from "@angular/core";
import { UpdateUser, User } from "../../../shared";
import { Mutation, gql } from "apollo-angular";

export interface UpdateUserResponse {
    updateUser: User
}

@Injectable({
    providedIn: 'root'
})
export class UpdateUserMutation extends Mutation<
    UpdateUserResponse,
    {
        input: UpdateUser
    }>{
        public override document = gql`
            mutation updateUser($input: UpdateUserInput!){
                updateUser(updateUser: $input){
                    correlationId
                    displayName
                    email
                }
            }`
    }