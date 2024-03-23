import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonsModule } from "./buttons";
import { CustomFormsModule } from "./forms/custom-forms.module";

@NgModule({
    imports: [
        CommonModule,
        ButtonsModule,
        CustomFormsModule],
    exports: [CustomFormsModule, ButtonsModule]
})
export class ComponentsModule {}