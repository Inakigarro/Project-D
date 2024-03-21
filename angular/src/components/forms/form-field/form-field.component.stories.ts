import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { FormFieldComponent } from "./form-field.component";
import { CustomFormsModule } from "../custom-forms.module";

const fromField : Meta<FormFieldComponent> = {
    title: 'custom-components/form-field',
    component: FormFieldComponent,
    decorators: [
        moduleMetadata({
            imports: [CustomFormsModule]
        })
    ]
}

export default fromField;

type FormFieldStory = StoryObj<FormFieldComponent>;

export const BasicFormField : FormFieldStory = {
    args: {
        formType: 'input',
        label: 'Display Name'
    }
}

export const BasicFormFieldDisabled : FormFieldStory = {
    args: {
        formType: 'input',
        label: 'Display Name',
        disabled: true
    }
}

export const BasicTextArea : FormFieldStory = {
    args: {
        formType: 'text-area',
        label: 'Description',
        disabled: false
    }
}

export const BasicTextAreaDisabled : FormFieldStory = {
    args: {
        formType: 'text-area',
        label: 'Description',
        disabled: true
    }
}