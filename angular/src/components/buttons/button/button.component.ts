import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BasicButton, ButtonDefinition } from "../model";
import { Action } from "@ngrx/store";

@Component({
    selector: 'ig-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
    @Input() 
    public buttonDefinition: ButtonDefinition;

    @Input()
    public label?: string;

    @Input()
    public icon?: string;
    
    @Input()
    public disabled : boolean = false;

    @Input()
    public action?: Action;

    @Output()
    public executed = new EventEmitter<Action>();
}