import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UsersService } from "../../domain/services/users.service";
import { CreateUser, User } from "../../shared";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { UserCreationAction, UsersGenericActions } from "../../domain/state/users.actions";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'ig-user-creation-form',
    templateUrl: './user-creation-form.component.html',
    styleUrl: './user-creation-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreationFormComponent {
    public displayNameControl = new FormControl('', {validators: [Validators.required]});
    public emailControl = new FormControl('', {
        validators: [
            Validators.required,
            Validators.email]});

    constructor(
        private readonly userService: UsersService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<UserCreationFormComponent>) {}

    public form = this.formBuilder.group({
        displayName: this.displayNameControl,
        email: this.emailControl
    });

    public getDisplayNameErrorMessage() {
        return this.displayNameControl.hasError('required') ? "You must enter a value" : ''
    }
    public getEmailErrorMessage(){
        if (this.emailControl.hasError('required')) {
            return 'You must enter a value';
          }
      
          return this.emailControl.hasError('email') ? 'Not a valid email' : '';
    }

    public saveUser(){
        if (this.form.valid) {
            const formValue = this.form.value;
            this.userService.dispatch(UserCreationAction.saveButtonClicked({
                createUser: {
                    displayName: formValue.displayName as string,
                    email: formValue.email as string,
                }
            }))
            this.dialogRef.close();
        }
    }
}