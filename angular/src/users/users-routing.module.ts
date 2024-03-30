import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersRoutingComponent } from "./users-routing.component";
import { UserListComponent } from "./feature/user-list/user-list.component";
import { UserCreationFormComponent } from "./feature/user-creation-form/user-creation-form.component";
import { UserEditionFormComponent } from "./feature/user-edition-form/user-edition-form.component";

const routes : Routes = [
    {
        path: '',
        component: UsersRoutingComponent,
        children: [
            {
                path: '',
                component: UserListComponent,
                children: [
                    {
                        path: 'new',
                        component: UserCreationFormComponent
                    },
                    {
                        path: ':userId',
                        component: UserEditionFormComponent
                    }
                ],
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}