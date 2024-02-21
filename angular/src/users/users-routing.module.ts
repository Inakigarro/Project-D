import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersRoutingComponent } from "./users-routing.component";
import { UserListComponent } from "./feature/user-list/user-list.component";

const routes : Routes = [
    {
        path: '',
        component: UsersRoutingComponent,
        children: [
            {
                path: '',
                component: UserListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}