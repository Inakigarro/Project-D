import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CreateSport, Sport, UpdateSport } from "../../shared";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

export const SportsGenericActions = createActionGroup({
    source: 'Sports',
    events: {
        "Init": emptyProps(),
        "Sports List Loaded": props<{sportsList: Sport[]}>(),
        "Sports List Updated": props<{sport: Sport}>(),
        "New Sport button clicked": emptyProps(),
        "Edit Sport button clicked": props<{listId: string, data: Sport}>()
    }
});

export const SportCreationActions = createActionGroup({
    source: "Sport Creation form",
    events: {
        "Open creation dialog": props<{dialogConfig: MatDialogConfig}>(),
        "Create sport requested": props<{data: CreateSport}>(),
        "Sport creation succeeded": props<{sport: Sport}>()
    }
});

export const SportEditionActions = createActionGroup({
    source: "Sport Edition form",
    events: {
        "Open edition dialog": props<{dialogConfig: MatDialogConfig}>(),
        "Edit sport requested": props<{data: UpdateSport}>(),
        "Sport edition succeeded": props<{sport: Sport}>()
    }
});