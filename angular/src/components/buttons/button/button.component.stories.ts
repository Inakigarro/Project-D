import { ButtonsModule } from "../buttons.module";
import { ButtonComponent } from "./button.component";
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

const button : Meta<ButtonComponent> = {
    title: 'custom-components/buttons',
    component: ButtonComponent,
    decorators: [
        moduleMetadata({
            imports: [ButtonsModule]
        })
    ]
}

export default button;
type ButtonStory = StoryObj<ButtonComponent>;

export const BasicButton : ButtonStory = {
    args: {
        buttonDefinition: {
            buttonType: 'normal',
            kind: 'basic',
            type: 'basic',
        },
        label: 'Basic',
        disabled: false,
    }
}

export const BasicButtonDisabled : ButtonStory = {
    args: {
        buttonDefinition: {
            buttonType: 'normal',
            kind: 'basic',
            type: 'basic',
        },
        label: 'Basic',
        disabled: true,
    }
}

export const RaisedButton : ButtonStory = {
    args: {
        buttonDefinition: {
            buttonType: 'normal',
            kind: 'raised',
            type: 'basic',
        },
        label: 'Raised',
        disabled: false,
    }
}

export const RaisedButtonDisabled : ButtonStory = {
    args: {
        buttonDefinition: {
            buttonType: 'normal',
            kind: 'raised',
            type: 'basic',
        },
        label: 'Raised',
        disabled: true
    }
}

export const FabButton : ButtonStory = {
    args: {
        buttonDefinition: {
            buttonType: 'normal',
            kind: 'fab',
            type: 'basic',
        },
        icon: 'home',
        disabled: false,
    }
}

export const FabButtonDisabled : ButtonStory = {
    args: {
        buttonDefinition: {
            buttonType: 'normal',
            kind: 'fab',
            type: 'basic',
        },
        icon: 'home',
        disabled: true
    }
}