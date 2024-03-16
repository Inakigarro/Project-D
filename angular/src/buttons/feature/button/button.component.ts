import { Component, Input } from "@angular/core";
import { BasicButton } from "../../shared/models";

@Component({
    selector: 'ig-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
    @Input() button: BasicButton;
}