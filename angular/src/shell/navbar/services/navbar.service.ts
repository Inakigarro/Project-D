import { Injectable } from "@angular/core";
import { NavigationService } from "../../../app/navigation.service";

@Injectable({
    providedIn: 'root'
})
export class NavbarService {

    constructor(private navigationService: NavigationService){}

}