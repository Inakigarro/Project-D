import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NavbarComponent } from "./navbar.component";

const MaterialModule = [MatSidenavModule];

@NgModule({
    declarations: [NavbarComponent],
    imports: [CommonModule, MaterialModule],
    exports: [NavbarComponent]
})
export class NavbarModule {}