import { RouterModule, Routes } from "@angular/router";
import { SportsRoutingComponent } from "./SportsRoutingComponent.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: SportsRoutingComponent,
        children: []
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SportsRoutingModule {}