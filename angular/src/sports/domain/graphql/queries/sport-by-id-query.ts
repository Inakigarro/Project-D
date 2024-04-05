import { Query, gql } from "apollo-angular";
import { Sport } from "../../../shared";
import { Injectable } from "@angular/core";

export interface SportById {
    sports: Sport[]
}

@Injectable({
    providedIn: 'root'
})
export class SportByIdQuery extends Query<
    SportById,
    {input: string}>{
        public override document = gql`
            query userById($input: UUID!) {
                sports(where: {correlationId: { eq: $input}}) {
                    correlationId
                    displayName
                }
            }`
    }