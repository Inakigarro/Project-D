import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ButtonComponent } from "./feature/button/button.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule],
    declarations: [ButtonComponent],
    exports: [ButtonComponent]
})
export class ButtonsModule {}