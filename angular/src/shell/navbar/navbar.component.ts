import { Component, Input } from "@angular/core";

@Component({
    selector: 'ig-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    @Input()
    public opened = true;
}