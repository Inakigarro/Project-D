import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersRoutingComponent } from "./users-routing.component";
import { MatTableModule } from '@angular/material/table'
import { UserListComponent } from "./feature/user-list/user-list.component";
import { ToolbarModule } from "../shell/toolbar/toolbar.module";
import { StoreModule } from "@ngrx/store";
import { USERS_FEATURE_KEY, usersReducer } from "./domain/state/users.reducer";
import { EffectsModule } from "@ngrx/effects";
import { UsersEffects } from "./domain/state/users.effects";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { UserCreationFormComponent } from "./feature/user-creation-form/user-creation-form.component";
import { MatCardModule } from '@angular/material/card';
import { ComponentsModule } from "../components/components.module";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MaterialModules = [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule
]

@NgModule({
    declarations: [
        UsersRoutingComponent,
        UserListComponent,
        UserCreationFormComponent],
    imports: [
        CommonModule,
        ToolbarModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModules,
        UsersRoutingModule,
        ComponentsModule,
        StoreModule.forFeature(
            USERS_FEATURE_KEY,
            usersReducer
        ),
        EffectsModule.forFeature([UsersEffects])],
    exports: []
})
export class UsersModule {}