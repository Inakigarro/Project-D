import { Injectable } from "@angular/core";
import { Query, gql } from "apollo-angular";
import { User } from "../../../shared";

export interface Users{
    users: User[]
}

@Injectable({
    providedIn: 'root'
})
export class UsersQuery extends Query<Users> {
    public override document = gql`
        query {
            users {
                correlationId
                displayName
                email
            }
        }`
}