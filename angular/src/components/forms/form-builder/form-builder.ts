import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export interface DynamicFormField<TItem> {
    name: string & keyof TItem;
    type: string;
    defaultValue: unknown,
    disabled: boolean,
    validators: Validators
}

@Injectable({providedIn: 'root'})
export class DynamicFormBuilder<TItem extends {}> {
    public formFields: DynamicFormField<TItem>[] = []

    public formGroup = this.formBuilder.group({});

    constructor(private formBuilder: FormBuilder){}

    public addFormField(field: DynamicFormField<TItem>) {
        this.formFields.push(field);
        return this;
    }

    public buildForm() {
        this.formFields.forEach(field => {
            let control = this.formBuilder.control({
                disabled: field.disabled,
                value: field.defaultValue
            },field.validators)
            this.formGroup.addControl(field.name, control);
        });
        return this.formGroup;
    }
}
