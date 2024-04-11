import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes : Routes = [
    {
        path: 'users',
        loadChildren: () => import('../users').then(m => m.UsersModule)
    },
    {
        path: 'sports',
        loadChildren: () => import('../sports/sports.module').then(m => m.SportsModule)
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