import { AfterViewInit, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Action, Store, createAction, emptyProps, props } from "@ngrx/store";
import { FormButton } from "../../buttons";
import { DynamicFormField } from "../model";
import { FormGroup } from "@angular/forms";
import { FormsActions } from "./state/form.actions";

const saveAction = createAction(
    '[Form] Save button clicked',
    props<{id: string; data: any}>()
);

const cancelAction = createAction(
    '[Form] Cancel button clicked',
    props<{id: string;}>()
)

const BasicFormButtons = [];

@Component({
    selector: 'ig-form',
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss'
})
export class FormComponent<TItem> implements OnDestroy {
    @Input()
    public formId: string = 'formulario';

    @Input()
    public formTitle?: string;

    @Input()
    public formFields?: DynamicFormField<TItem>[];

    @Input()
    public formGroup: FormGroup;

    @Input()
    public formButtons : FormButton[] = [];

    constructor(private readonly store: Store) {}

    ngOnDestroy(): void {
        this.formTitle = '';
        this.formGroup = new FormGroup({});
        this.formFields = [];
        this.formButtons = [];
    }

    public humanizeLabel(label: string) {
        let result = label.replace(/([a-z])([A-Z])/g, '$1 $2')
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    public onClick(action: Action) {
        this.store.dispatch(action)
    }

    public onSaveButtonClicked() {
        let data = this.formGroup.value as TItem
        this.store.dispatch(FormsActions.saveFormRequested({id:this.formId, data:data}))
        this.formGroup.reset();
    }
    
    public onResetButtonClicked() {
        this.formGroup.reset();
    }

    public onCancelButtonClicked() {
        this.formGroup.reset();
        this.store.dispatch(FormsActions.cancelFormRequested({id: this.formId}));
    }
}