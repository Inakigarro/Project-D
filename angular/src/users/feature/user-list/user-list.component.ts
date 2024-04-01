import { Component } from "@angular/core";
import { User } from "../../shared";
import { UsersService } from "../../domain/services/users.service";
import { MatDialog, } from "@angular/material/dialog";
import { USER_CREATION_FORM_ID } from "../user-creation-form/user-creation-form.component";
import { UserCreationActions } from "../../domain/state/users.actions";

export const USERS_LIST_ID = 'users-list';

@Component({
    selector: "ig-users-list",
    templateUrl: './user-list.component.html',
    styleUrl: "./user-list.component.scss",
})
export class UserListComponent {
    public listId = USERS_LIST_ID;
    public listTitle = 'Users';
    public listHeaders : (string & keyof User | 'buttons')[] = ['displayName', 'email', "buttons"];
    public listData = this.usersService.usersList$;
    public loaded$ = this.usersService.usersLoaded$;

    constructor(
        private readonly usersService: UsersService,
        public userCreationDialog: MatDialog,){
    }

    public openUserCreationDialog() {
        this.usersService.dispatch(
            UserCreationActions.openCreationDialog({
                dialogConfig:{
                    id: USER_CREATION_FORM_ID,
                    width: '35%',
                    height: 'auto',
        }}))
    }
}