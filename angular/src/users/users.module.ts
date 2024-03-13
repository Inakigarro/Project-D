import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersRoutingComponent } from "./users-routing.component";
import { MatTableModule } from '@angular/material/table'
import { UserListComponent } from "./feature/user-list/user-list.component";
import { ToolbarModule } from "../shell/toolbar/toolbar.module";
import { StoreModule } from "@ngrx/store";
import { USERS_FEATURE_KEY, usersReducer } from "./domain/state/users.reducer";

const MaterialModules = [
    MatTableModule
]

@NgModule({
    declarations: [
        UsersRoutingComponent,
        UserListComponent],
    imports: [
        CommonModule,
        ToolbarModule,
        MaterialModules,
        UsersRoutingModule,
        StoreModule.forFeature(
            USERS_FEATURE_KEY,
            usersReducer
        )],
    exports: []
})
export class UsersModule {}