import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ButtonComponent } from "./button/button.component";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [ButtonComponent],
    exports: [ButtonComponent, MatButtonModule, MatIconModule]
})
export class ButtonsModule {}