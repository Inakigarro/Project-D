import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonsModule } from "./buttons";
import { CustomFormsModule } from "./forms/custom-forms.module";
import { CustomListsModule } from "./lists/custom-lists.module";

@NgModule({
    imports: [
        CommonModule,
        ButtonsModule,
        CustomFormsModule,
        CustomListsModule],
    exports: [
        ButtonsModule, CustomFormsModule, CustomListsModule]
})
export class ComponentsModule {}