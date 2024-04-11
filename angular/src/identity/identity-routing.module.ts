import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IdentityRoutingComponent } from "./identity-routing.component";
import { RegisterUserComponent } from "./register/register-user.component";
import { LoginComponent } from "./login/login.component";

const routes : Routes = [
    {
        path: '',
        component: IdentityRoutingComponent,
        children: [
            {
                path: 'register',
                component: RegisterUserComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IdentityRoutingModule {}