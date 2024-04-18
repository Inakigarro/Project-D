import { RouterModule, Routes } from "@angular/router";
import { SportsRoutingComponent } from "./SportsRoutingComponent.component";
import { NgModule } from "@angular/core";
import { SportsListComponent } from "./features/sports-list/sports-list.component";
import { SportCreationFormComponent } from "./features/sport-creation-form/sport-creation-form.component";
import { SportEditionFormComponent } from "./features/sport-edition-form/sport-edition-form.component";

const routes: Routes = [
    {
        path: '',
        component: SportsRoutingComponent,
        children: [
            {
                path: '',
                component: SportsListComponent,
                children: [
                    {
                        path: 'new',
                        component: SportCreationFormComponent
                    },
                    {
                        path: ':sportId',
                        component: SportEditionFormComponent
                    }
                ]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SportsRoutingModule {}