import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from "./toolbar.component";

const MaterialModules = [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
]

@NgModule({
    declarations: [ToolbarComponent],
    imports: [CommonModule,MaterialModules],
    exports: [ToolbarComponent]
})
export class ToolbarModule {}