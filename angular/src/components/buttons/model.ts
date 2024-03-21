import { Action } from "@ngrx/store";

export interface ButtonDefinition {
    buttonType: 'normal'|'submit'|'warning';
    type: 'basic'|'submit'|'reset';
    kind: 'basic'|'raised'|'fab';
}

export interface BasicButton {
    buttonDefinition: ButtonDefinition;
    label?:string;
    icon?:string;
    disabled?: boolean;
}

export interface FormButton extends BasicButton {
    action: Action;
}
