import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CreateUser } from "../../shared";
import { FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { DynamicFormBuilder } from "../../../components/forms/form-builder/form-builder";

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
    public fields = Object.keys(placeholder);

    constructor(
        private dynamicFormBuilder: DynamicFormBuilder<CreateUser>,
        public dialogRef: MatDialogRef<UserCreationFormComponent>) {}
    
    public ngOnInit(): void {
        this.dynamicFormBuilder
            .addFormField({
                name: 'displayName',
                type: 'input',
                defaultValue: '',
                validators: [Validators.required, Validators.maxLength(140)]
            })
            .addFormField({
                name: 'email',
                type: 'input',
                defaultValue: '',
                validators: [Validators.required, Validators.maxLength(140), Validators.email]
            });
        this.form = this.dynamicFormBuilder.buildForm();
    }

    public humanizeLabel(label: string){
        let result = label.replace(/([a-z])([A-Z])/g, '$1 $2')
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    public saveUser(){
        console.log(this.form.value);
    }
}