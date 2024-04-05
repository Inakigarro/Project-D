import { Injectable } from "@angular/core";
import { Sport } from "../../../shared";
import { Query, gql } from "apollo-angular";

export interface Sports {
    sports: Sport[]
}

@Injectable({
    providedIn: 'root'
})
export class SportsQuery extends Query<Sports> {
    public override document = gql`
        query {
            sports {
                correlationId
                displayName
            }
        }`
}