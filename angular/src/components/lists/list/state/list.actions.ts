import { createAction, props } from "@ngrx/store";

export const editRowButtonClicked = createAction(
    '[List] Edit list row button clicked',
    props<{listId: string; rowId: string}>()
)