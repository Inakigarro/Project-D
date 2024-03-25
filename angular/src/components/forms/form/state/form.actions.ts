import { FormGroup } from "@angular/forms";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const FormsActions = createActionGroup({
    source: 'Form',
    events: {
        'Save form requested': props<{id: string, data: any}>(),
        'Cancel form requested': props<{id: string}>(),
    }
})