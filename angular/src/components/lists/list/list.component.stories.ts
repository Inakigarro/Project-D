import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { ListComponent } from "./list.component";
import { CustomListsModule } from "../custom-lists.module";
import { provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";

interface listExample {
    displayName: string,
    email: string,
    number: string,
}

const initialState = {
    value: 'value'
}

const list: Meta<ListComponent<listExample>> = {
    title: 'custom-components/list',
    component: ListComponent,
    decorators: [
        moduleMetadata({
            imports: [CustomListsModule],
            providers: [provideMockStore({initialState})]
        })
    ]
}

export default list;
type ListStory = StoryObj<ListComponent<listExample>>;

export const BasicList: ListStory = {
    args: {
        listId: 'story-list',
        listTitle: 'Story List',
        listHeaders: ['displayName', 'email', 'number', 'buttons'],
        listData: of([
            {
                displayName: 'Iñaki Garro',
                email: 'igarro@email.com',
                number: '123456789'
            }
        ]),
        listButtons: [
            {
                buttonDefinition: {
                    buttonType: 'normal',
                    kind: 'raised',
                    type: 'basic'
                },
                label: 'Edit',
                disabled: false,
            }
        ]
    }
}