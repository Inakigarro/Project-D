import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../identity/auth-guard";

const routes : Routes = [
    {
        path: 'users',
        loadChildren: () => import('../users').then(m => m.UsersModule),
        canActivate: [AuthGuard],
        title: 'Users'
    },
    {
        path: 'sports',
        loadChildren: () => import('../sports/sports.module').then(m => m.SportsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'identity',
        loadChildren: () => import('../identity/identity.module').then(m => m.IdentityModule)
    },
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}