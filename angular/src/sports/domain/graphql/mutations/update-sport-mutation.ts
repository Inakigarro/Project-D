import { Injectable } from "@angular/core";
import { Sport, UpdateSport } from "../../../shared";
import { Mutation, gql } from "apollo-angular";

export interface UpdateSportResponse {
    updateSport: Sport
}

@Injectable({
    providedIn: 'root'
})
export class UpdateSportMutation extends Mutation<
    UpdateSportMutation,
    {
        inpur: UpdateSport
    }>{
        public override document = gql`
            mutation updateSport($input: UpdateSportInput!) {
                updateSport(updateSport: $input){
                    correlationId
                    displayName
                }
            }`
    }