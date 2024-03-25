import { Validators } from "@angular/forms";

export type FormType = 'input' | 'text-area'

export interface DynamicFormField<TItem> {
    name: string & keyof TItem;
    type: FormType;
    defaultValue: unknown,
    disabled: boolean,
    validators: Validators
}