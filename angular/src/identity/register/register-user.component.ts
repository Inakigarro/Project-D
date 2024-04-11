import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { RegisterUser } from "../models";
import { DynamicFormBuilder } from "../../components/forms/form-builder/form-builder";

export const REGISTER_USER_FORM_ID = "register-user-form";

@Component({
    selector: 'ig-register-user',
    templateUrl: './register-user.component.html',
    styleUrl: './register-user.component.scss',
})
export class RegisterUserComponent implements OnInit, OnDestroy {
    public formId = REGISTER_USER_FORM_ID;
    public form: FormGroup;
    public formButtons = this.dynamicFormBuilder.formButtons;
    public formFields = this.dynamicFormBuilder.formFields;
    
    constructor(
        private dynamicFormBuilder: DynamicFormBuilder<RegisterUser>,
    ) {}

    ngOnInit(): void {
        this.dynamicFormBuilder
            .addFormField({
                name: 'email',
                type: 'input',
                defaultValue: '',
                disabled: false,
                validators: [Validators.required],
                hidden: false,
            })
            .addFormField({
                name: 'password',
                type: 'password',
                defaultValue: '',
                disabled: false,
                validators: [Validators.required],
                hidden: false,
            });
        this.form = this.dynamicFormBuilder.buildForm();
    }
    ngOnDestroy(): void {
        this.dynamicFormBuilder.destroyForm();
    }
}