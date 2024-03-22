export type FormType = 'input' | 'select' | 'text-area'

export interface FormField {
    type?: FormType;
    label?: string;
    disabled?: boolean;
}
