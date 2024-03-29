import { NgModule } from "@angular/core";
import { ListComponent } from "./list/list.component";
import { MatTableModule } from "@angular/material/table";
import { ButtonsModule } from "../buttons";
import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BehaviorSubject } from "rxjs";

@NgModule({
    declarations: [ListComponent],
    imports: [MatTableModule, ButtonsModule, MatCardModule, FlexLayoutModule],
    exports: [ListComponent]
})
export class CustomListsModule {}