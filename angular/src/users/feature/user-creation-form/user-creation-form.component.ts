import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CreateUser } from "../../shared";
import { FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { DynamicFormBuilder } from "../../../components/forms/form-builder/form-builder";
import { UserCreationAction } from "../../domain/state/users.actions";

const placeholder : CreateUser = {
    displayName: '',
    email: ''
}

@Component({
    selector: 'ig-user-creation-form',
    templateUrl: './user-creation-form.component.html',
    styleUrl: './user-creation-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreationFormComponent implements OnInit {
    public form : FormGroup;
    public formButtons = this.dynamicFormBuilder.formButtons;
    public formFields = this.dynamicFormBuilder.formFields;

    constructor(
        private dynamicFormBuilder: DynamicFormBuilder<CreateUser>,
        public dialogRef: MatDialogRef<UserCreationFormComponent, CreateUser>) {
            this.dialogRef.beforeClosed().subscribe(
                () => {
                    this.form = this.dynamicFormBuilder.destroyForm();
                }
            ) 
        }
    
    public ngOnInit(): void {
        this.dynamicFormBuilder
            .addFormField({
                name: 'displayName',
                type: 'input',
                defaultValue: '',
                disabled: false,
                validators: [Validators.required, Validators.maxLength(140)]
            })
            .addFormField({
                name: 'email',
                type: 'input',
                defaultValue: '',
                disabled: false,
                validators: [Validators.required, Validators.maxLength(140), Validators.email]
            });
        this.form = this.dynamicFormBuilder.buildForm();
    }
}