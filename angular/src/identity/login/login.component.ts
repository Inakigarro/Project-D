import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { LoginUser } from "../models";
import { DynamicFormBuilder } from "../../components/forms/form-builder/form-builder";

export const LOGIN_USER_FORM_ID = 'login-user-form';

@Component({
    selector: 'ig-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
    public formId = LOGIN_USER_FORM_ID;
    public form: FormGroup;
    public formButtons = this.dynamicFormBuilder.formButtons;
    public formFields = this.dynamicFormBuilder.formFields;
    
    constructor(
        private dynamicFormBuilder: DynamicFormBuilder<LoginUser>,
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