import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DynamicFormField } from '../model';
import { FormButton } from "../../buttons";

@Injectable({providedIn: 'root'})
export class DynamicFormBuilder<TItem extends {}> {
    public formGroup = this.formBuilder.group({});
    public formFields: DynamicFormField<TItem>[] = []
    public formButtons: FormButton[] = [];

    constructor(private formBuilder: FormBuilder){}

    /**
     * Add a form field to the builder.
     * @param field The dynamic form field to add to the form.
     * @returns The builder for chaining.
     */
    public addFormField(field: DynamicFormField<TItem>) {
        this.formFields.push(field);
        return this;
    }

    /**
     * Add a form button to the builder.
     * @param button The form button to add to the form.
     * @returns The builder for chaining/
     */
    public addFormButton(button: FormButton){
        this.formButtons.push(button);
        return this;
    }

    /**
     * For each form field added, creates a form control and add it
     * to the form group.
     * @returns The builded form group.
     */
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

    /**
     * Resets the form group value and remove all form controls.
     */
    public destroyForm() {
        this.formFields.forEach(field =>{
            this.formGroup.removeControl(field.name);
        });

        this.formFields = [];
        this.formButtons = [];
        return this.formGroup;
    }
}
