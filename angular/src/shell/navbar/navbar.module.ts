import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { NavbarComponent } from "./navbar.component";
import { ButtonsModule } from "../../components/buttons";

const MaterialModule = [
    MatSidenavModule,
    MatListModule];

@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ButtonsModule],
    exports: [NavbarComponent]
})
export class NavbarModule {}