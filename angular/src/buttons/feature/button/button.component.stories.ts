import { ButtonsModule } from "../../buttons.module";
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
        button: {
            buttonDefinition: {
                buttonType: 'normal',
                kind: 'basic',
                type: 'basic',
            },
            label: 'Basic'
        }
    }
}

export const RaisedButton : ButtonStory = {
    args: {
        button: {
            buttonDefinition: {
                buttonType: 'normal',
                kind: 'raised',
                type: 'basic',
            },
            label: 'Raised'
        }
    }
}

export const FabButton : ButtonStory = {
    args: {
        button: {
            buttonDefinition: {
                buttonType: 'normal',
                kind: 'fab',
                type: 'basic',
            },
            icon: 'home'
        }
    }
}
