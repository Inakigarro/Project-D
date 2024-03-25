import { Component } from "@angular/core";
import { User } from "../../shared";
import { MatTableDataSource } from "@angular/material/table";
import { UsersService } from "../../domain/services/users.service";
import { filter, map } from "rxjs";
import { MatDialog, } from "@angular/material/dialog";
import { USER_CREATION_FORM_ID, UserCreationFormComponent } from "../user-creation-form/user-creation-form.component";
import { BasicButton } from "../../../components/buttons";
import { UserCreationActions } from "../../domain/state/users.actions";

@Component({
    selector: "ig-users-list",
    templateUrl: './user-list.component.html',
    styleUrl: "./user-list.component.scss",
})
export class UserListComponent {
    public dataSource = new MatTableDataSource<User>();
    public headers = ['displayName', 'email'];
    public listToolbarButtons : BasicButton[] = [
        {
            buttonDefinition: {
                buttonType: 'normal',
                kind: 'raised',
                type: 'basic'
            },
            disabled: false,
            label: 'New'
        }
    ];
    public loaded$ = this.usersService.usersLoaded$;
    constructor(
        private readonly usersService: UsersService,
        public userCreationDialog: MatDialog){
        this.usersService.usersList$.pipe(
            filter(x => !!x),
            map((data) => {
                this.dataSource.data = data;
            })
        ).subscribe();
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