import { Component, Input } from "@angular/core";
import { NavigationService } from "../../app/navigation.service";
import { NavigationButton } from "../../components/buttons/model";

@Component({
    selector: 'ig-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    public UsersNavigationButton : NavigationButton = {
        buttonDefinition: {
            buttonType: 'normal',
            kind: 'raised',
            type: 'basic'
        },
        label: 'Users',
        disabled: false,
        url: 'users'
    }

    public SportsNavigationButton : NavigationButton = {
        buttonDefinition: {
            buttonType: 'normal',
            kind: 'raised',
            type: 'basic'
        },
        label: 'Sports',
        disabled: false,
        url: 'sports'
    }
    @Input()
    public opened = true;

    constructor(private navigationService: NavigationService){}

    public navigate(url: string){
        this.navigationService.navigate([url]);
    }
}