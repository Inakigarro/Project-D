import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Action, Store, createAction, emptyProps, props } from "@ngrx/store";
import { FormButton } from "../../buttons";
import { DynamicFormField } from "../model";
import { FormGroup } from "@angular/forms";

const saveAction = createAction(
    '[Form] Save button clicked'
);

const cancelAction = createAction(
    '[Form] Cancel button clicked',
)

@Component({
    selector: 'ig-form',
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss'
})
export class FormComponent<TItem> implements OnInit {
    @Input()
    public formTitle?: string;

    @Input()
    public formFields?: DynamicFormField<TItem>[];

    @Input()
    public formGroup: FormGroup;

    @Input()
    public formButtons : FormButton[] = [];

    constructor(private readonly store: Store){}

    public ngOnInit(): void {
        this.formButtons.push({
            buttonDefinition: {
                buttonType: 'submit',
                kind: 'raised',
                type: 'submit'
            },
            label: 'Save',
            disabled: false,
            action: saveAction()
        });
        this.formButtons.push({
            buttonDefinition: {
                buttonType: 'normal',
                kind: 'basic',
                type: 'reset'
            },
            label: 'Cancel',
            disabled: false,
            action: cancelAction()
        })
    }

    public humanizeLabel(label: string){
        let result = label.replace(/([a-z])([A-Z])/g, '$1 $2')
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    public onClick(action: Action) {
        this.store.dispatch(action)
    }
}