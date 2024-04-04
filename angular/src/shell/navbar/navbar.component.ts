import { Component, Input } from "@angular/core";
import { BasicButton } from "../../components/buttons";

@Component({
    selector: 'ig-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    public UsersNavigationButton : BasicButton = {
        buttonDefinition: {
            buttonType: 'normal',
            kind: 'raised',
            type: 'basic'
        },
        label: 'Users',
        disabled: false,
    }
    @Input()
    public opened = true;
}