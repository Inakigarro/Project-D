import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { FormComponent } from "./form.component";
import { CustomFormsModule } from "../custom-forms.module";
import { createAction } from "@ngrx/store";
import { provideMockStore } from '@ngrx/store/testing';

const SaveAction = createAction('[Form Story] Save button clicked');
const CancelAction = createAction('[Form Story] Cancel button clicked');

interface example {
    displayName: string;
    email: string;
}

const initialState = {
    value: 'value'
}

const form : Meta<FormComponent<example>> = {
    title: 'custom-components/form-field',
    component: FormComponent,
    decorators: [
        moduleMetadata({
            imports: [CustomFormsModule],
            providers: [
                provideMockStore({initialState})
            ]
        })
    ]
}

export default form;
type FormStory = StoryObj<FormComponent<example>>;

export const BasicForm : FormStory = {
    args: {
        formTitle: 'Form Title',
        formFields: [
            {
                name: 'displayName',
                type: 'input',
                defaultValue: '',
                validators: [],
                disabled: false
            },
            {
                name: 'email',
                type: 'input',
                defaultValue: '',
                validators: [],
                disabled: false,
            }
        ],
        formButtons: [
            {
                buttonDefinition: {
                    buttonType: 'normal',
                    kind: 'raised',
                    type: 'submit'
                },
                label: 'Aceptar',
                action: SaveAction,
                disabled: false
            },
            {
                buttonDefinition: {
                    buttonType: 'normal',
                    kind: 'basic',
                    type: 'reset'
                },
                label: 'Cancelar',
                action: CancelAction,
                disabled: false
            }
        ]
    }
}