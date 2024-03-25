import { Component, Input, input } from "@angular/core";
import { FormType } from "../model";

@Component({
    selector: 'ig-form-field',
    templateUrl: './form-field.component.html',
    styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
    @Input()
    public formType?: FormType = 'input';

    @Input()
    public label?: string;

    @Input()
    public disabled?: boolean;
}