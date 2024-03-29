import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { DynamicFormBuilder } from "../../../components/forms/form-builder/form-builder";
import { UpdateUser } from "../../shared";
import { MatDialogRef } from "@angular/material/dialog";

export const USER_EDITION_FORM_ID = 'user-edition-form';

@Component({
    selector: 'ig-user-creation-form',
    templateUrl: './user-edition-form.component.html',
    styleUrl: './user-edition-form.component.scss'
})
export class UserEditionFormComponent implements OnInit, OnDestroy {
    public formId = USER_EDITION_FORM_ID;
    public form: FormGroup;
    public formButtons = this.dynamicFormBuilder.formButtons;
    public formFields = this.dynamicFormBuilder.formFields;

    constructor(
        private dynamicFormBuilder: DynamicFormBuilder<UpdateUser>,
        public dialogRef: MatDialogRef<UserEditionFormComponent, UpdateUser>
    ){}

    ngOnInit(): void {
        this.dynamicFormBuilder
            .addFormField({
                name: 'displayName',
                type: 'input',
                defaultValue: '',
                disabled: false,
                validators: [Validators.required, Validators.maxLength(140)],
            })
            .addFormField({
                name: 'email',
                type: 'input',
                defaultValue: '',
                disabled: false,
                validators: [Validators.required, Validators.maxLength(140), Validators.email]
            })
    }
    ngOnDestroy(): void {
        this.dynamicFormBuilder.destroyForm();
    }
}