import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { DynamicFormBuilder } from "../../../components/forms/form-builder/form-builder";
import { UpdateUser } from "../../shared";
import { MatDialogRef } from "@angular/material/dialog";
import { UsersService } from "../../domain/services/users.service";
import { Subject, takeUntil } from "rxjs";

export const USER_EDITION_FORM_ID = 'user-edition-form';

@Component({
    selector: 'ig-user-edition-form',
    templateUrl: './user-edition-form.component.html',
    styleUrl: './user-edition-form.component.scss'
})
export class UserEditionFormComponent implements OnInit, OnDestroy {
    public destroy$ = new Subject();

    public formId = USER_EDITION_FORM_ID;
    public form: FormGroup;
    public formButtons = this.dynamicFormBuilder.formButtons;
    public formFields = this.dynamicFormBuilder.formFields;
    constructor(
        private dynamicFormBuilder: DynamicFormBuilder<UpdateUser>,
        private usersService: UsersService,
        public dialogRef: MatDialogRef<UserEditionFormComponent, UpdateUser>
    ){}

    ngOnInit(): void {
        this.usersService.currentUser$.pipe(
            takeUntil(this.destroy$)
        ).subscribe((user) => 
            this.dynamicFormBuilder
            .addFormField({
                name: 'correlationId',
                type: 'input',
                defaultValue: user?.correlationId,
                disabled: false,
                validators: [Validators.required],
                hidden: true
            })
            .addFormField({
                name: 'displayName',
                type: 'input',
                defaultValue: user?.displayName,
                disabled: false,
                validators: [Validators.required, Validators.maxLength(140)],
                hidden: false,
            })
            .addFormField({
                name: 'email',
                type: 'input',
                defaultValue: user?.email,
                disabled: false,
                validators: [Validators.required, Validators.maxLength(140), Validators.email],
                hidden: false
            }))
        
        this.form = this.dynamicFormBuilder.buildForm();
        console.log(this.form);
    }
    ngOnDestroy(): void {
        this.destroy$.next({});
        this.destroy$.complete();
        this.dynamicFormBuilder.destroyForm();
    }
}