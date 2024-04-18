import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { DynamicFormBuilder } from "../../../components/forms/form-builder/form-builder";
import { CreateSport } from "../../shared";
import { MatDialogRef } from "@angular/material/dialog";

export const SPORT_CREATION_FORM_ID = 'sport-creation-form';

@Component({
    selector: 'ig-sport-creation-form',
    templateUrl: './sport-creation-form.component.html',
    styleUrl: './sport-creation-form.component.scss'
})
export class SportCreationFormComponent implements OnInit, OnDestroy {
    public formId = SPORT_CREATION_FORM_ID;
    public form: FormGroup;
    public formButtons = this.dynamicFormBuilder.formButtons;
    public formFields = this.dynamicFormBuilder.formFields;

    constructor(
        private dynamicFormBuilder: DynamicFormBuilder<CreateSport>,
        public dialogRef: MatDialogRef<SportCreationFormComponent, CreateSport>
    ){}

    public ngOnInit(): void {
        this.dynamicFormBuilder
            .addFormField({
                name: 'displayName',
                type: 'input',
                defaultValue: '',
                disabled: false,
                validators: [Validators.required],
                hidden: false
            });
        this.form = this.dynamicFormBuilder.buildForm();
    }

    public ngOnDestroy(): void {
        this.dynamicFormBuilder.destroyForm();
    }
}