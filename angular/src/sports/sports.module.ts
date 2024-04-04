import { NgModule } from "@angular/core";
import { SportsRoutingComponent } from "./SportsRoutingComponent.component";
import { CommonModule } from "@angular/common";
import { SportsRoutingModule } from "./sports-routing.module";

@NgModule({
    declarations: [SportsRoutingComponent],
    imports: [
        CommonModule,
        SportsRoutingModule],
    exports: []
})
export class SportsModule {}