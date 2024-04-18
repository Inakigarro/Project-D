import { NgModule } from "@angular/core";
import { SportsRoutingComponent } from "./SportsRoutingComponent.component";
import { CommonModule } from "@angular/common";
import { SportsRoutingModule } from "./sports-routing.module";
import { StoreModule } from "@ngrx/store";
import { SPORT_FEATURE_KEY, sportsReducer } from "./domain/state/sports.reducer";
import { EffectsModule } from "@ngrx/effects";
import { SportsEffects } from "./domain/state/sports.effects";
import { ToolbarModule } from "../shell/toolbar/toolbar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "../components/components.module";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SportsListComponent } from "./features/sports-list/sports-list.component";
import { SportCreationFormComponent } from "./features/sport-creation-form/sport-creation-form.component";
import { SportEditionFormComponent } from "./features/sport-edition-form/sport-edition-form.component";

const MaterialModules = [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormField,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule
]

@NgModule({
    declarations: [
        SportsRoutingComponent,
        SportsListComponent,
        SportCreationFormComponent,
        SportEditionFormComponent],
    imports: [
        CommonModule,
        ToolbarModule,
        ReactiveFormsModule,
        FormsModule,
        ComponentsModule,
        MaterialModules,
        SportsRoutingModule,
        StoreModule.forFeature(
            SPORT_FEATURE_KEY,
            sportsReducer
        ),
        EffectsModule.forFeature([SportsEffects])],
    exports: []
})
export class SportsModule {}