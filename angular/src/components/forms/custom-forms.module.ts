import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormFieldComponent } from "./form-field/form-field.component";
import { MatSelect } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { FormComponent } from "./form/form.component";
import { ButtonsModule } from "../buttons";
import { MatCardModule } from "@angular/material/card";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelect,
        MatOptionModule,
        MatCardModule,
        ButtonsModule],
        declarations: [
            FormComponent,
            FormFieldComponent],
        exports: [
            FormComponent,
            FormFieldComponent]
})
export class CustomFormsModule {}