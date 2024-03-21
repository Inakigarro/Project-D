import { Component, Input } from "@angular/core";
import { FormField } from "../model";
import { Action, Store } from "@ngrx/store";
import { FormButton } from "../../buttons";

@Component({
    selector: 'ig-form',
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss'
})
export class FormComponent {
    @Input()
    public formTitle?: string;
    
    @Input()
    public fields: FormField[] = [];

    @Input()
    public formButtons : FormButton[] = [];

    constructor(private readonly store: Store){}

    public onClick(action: Action) {
        this.store.dispatch(action)
    }
}