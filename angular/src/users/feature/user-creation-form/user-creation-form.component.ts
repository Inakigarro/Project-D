import { Component, OnDestroy, OnInit } from "@angular/core";
import { CreateUser } from "../../shared";
import { FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { DynamicFormBuilder } from "../../../components/forms/form-builder/form-builder";

export const USER_CREATION_FORM_ID = 'user-creation-form';

@Component({
    selector: 'ig-user-creation-form',
    templateUrl: './user-creation-form.component.html',
    styleUrl: './user-creation-form.component.scss',
})
export class UserCreationFormComponent implements OnInit, OnDestroy {
    public formId = USER_CREATION_FORM_ID;
    public form : FormGroup;
    public formButtons = this.dynamicFormBuilder.formButtons;
    public formFields = this.dynamicFormBuilder.formFields;

    constructor(
        private dynamicFormBuilder: DynamicFormBuilder<CreateUser>,
        public dialogRef: MatDialogRef<UserCreationFormComponent, CreateUser>) {}
    
    public ngOnInit(): void {
        this.dynamicFormBuilder
            .addFormField({
                name: 'displayName',
                type: 'input',
                defaultValue: '',
                disabled: false,
                validators: [Validators.required, Validators.maxLength(140)],
                hidden: false
            })
            .addFormField({
                name: 'email',
                type: 'input',
                defaultValue: '',
                disabled: false,
                validators: [Validators.required, Validators.maxLength(140), Validators.email],
                hidden: false,
            });
        this.form = this.dynamicFormBuilder.buildForm();
    }

    public ngOnDestroy(): void {
        this.dynamicFormBuilder.destroyForm();
    }
}