import { Component, OnDestroy, OnInit } from "@angular/core";
import { DynamicFormBuilder } from "../../../components/forms/form-builder/form-builder";
import { UpdateSport } from "../../shared";
import { SportsService } from "../../domain/service/sports.service";
import { MatDialogRef } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { FormGroup, Validators } from "@angular/forms";

export const SPORT_EDITION_FORM_ID = 'sport-edition-form';

@Component({
    selector: 'ig-sport-edition-form',
    templateUrl: './sport-edition-form.component.html'
})
export class SportEditionFormComponent implements OnInit, OnDestroy {
    public destroy$ = new Subject();
    public formId = SPORT_EDITION_FORM_ID;
    public form: FormGroup;
    public formButtons = this.dynamicFormBuilder.formButtons;
    public formFields = this.dynamicFormBuilder.formFields;

    constructor(
        private dynamicFormBuilder: DynamicFormBuilder<UpdateSport>,
        private sportsService: SportsService,
        public dialogRef: MatDialogRef<SportEditionFormComponent, UpdateSport>
    ){}
    ngOnInit(): void {
        this.sportsService.currentSport$.pipe(
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
                }))
            this.form = this.dynamicFormBuilder.buildForm();
    }
    ngOnDestroy(): void {
        this.destroy$.next({});
        this.destroy$.complete();
        this.dynamicFormBuilder.destroyForm();
    }
}