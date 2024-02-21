import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersRoutingComponent } from "./users-routing.component";
import { MatTableModule } from '@angular/material/table'
import { UserListComponent } from "./feature/user-list/user-list.component";
import { ToolbarModule } from "../shell/toolbar/toolbar.module";

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
        UsersRoutingModule],
    exports: []
})
export class UsersModule {}