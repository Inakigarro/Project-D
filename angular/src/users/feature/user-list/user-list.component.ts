import { Component } from "@angular/core";
import { User } from "../../shared";
import { MatTableDataSource } from "@angular/material/table";
import { UsersService } from "../../domain/services/users.service";
import { filter, map } from "rxjs";

@Component({
    selector: "ig-users-list",
    templateUrl: './user-list.component.html',
    styleUrl: "./user-list.component.scss",
})
export class UserListComponent {
    public dataSource = new MatTableDataSource<User>();
    public headers = ['displayName', 'email'];
    public loaded$ = this.usersService.usersLoaded$;
    constructor(private readonly usersService: UsersService){
        this.usersService.usersList$.pipe(
            filter(x => !!x),
            map((data) => {
                console.log(data);
                this.dataSource.data = data;
            })
        ).subscribe();
    }
}