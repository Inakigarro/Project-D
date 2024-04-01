import { Injectable } from "@angular/core";
import { User } from "../../../shared";
import { Query, gql } from "apollo-angular";

export interface UserById {
    users: User[]
}

@Injectable({
    providedIn: 'root'
})
export class UserByIdQuery extends Query<
    UserById,
    {input: string}> {
    public override document = gql`
        query userById($input: UUID!) {
            users(where: { correlationId: { eq: $input }}){
                correlationId
                displayName
                email
            }
        }`
}