import { NgModule } from "@angular/core";
import { RegisterUserComponent } from "./register/register-user.component";
import { CustomFormsModule } from "../components/forms/custom-forms.module";
import { IdentityRoutingComponent } from "./identity-routing.component";
import { IdentityRoutingModule } from "./identity-routing.module";
import { EffectsModule } from "@ngrx/effects";
import { IdentityEffects } from "./domain/state/identity.effects";
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations: [
        IdentityRoutingComponent,
        RegisterUserComponent,
        LoginComponent],
    imports: [
        CustomFormsModule,
        IdentityRoutingModule,
        EffectsModule.forFeature([IdentityEffects])],
    exports: [
        RegisterUserComponent,
        LoginComponent],
})
export class IdentityModule {}