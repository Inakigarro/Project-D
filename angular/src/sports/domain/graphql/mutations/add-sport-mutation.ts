import { Injectable } from "@angular/core";
import { CreateSport, Sport } from "../../../shared";
import { Mutation, gql } from "apollo-angular";

export interface AddSportResponse {
    addSport : Sport
}

@Injectable({
    providedIn: 'root'
})
export class AddSportMutation extends Mutation<
    AddSportResponse,
    {
        input: CreateSport
    }>{
        public override document = gql`
            mutation addSport($input: CreateSportInput!){
                addSport(createSport: $input) {
                    correlationId
                    displayName
                }
            }`
    }