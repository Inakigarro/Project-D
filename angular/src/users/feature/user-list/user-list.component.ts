import { Component } from "@angular/core";
import { User } from "../../shared";
import { MatTableDataSource } from "@angular/material/table";

const users : User[] = [
    {
        correlationId: '1',
        displayName: 'Iñaki Garro',
        email: 'igarro@email.com',
        loginId: 'igarro'
    },
    {
        correlationId: '2',
        displayName: 'Lucila Almada',
        email: 'lalmada@email.com',
        loginId: 'lalmada'
    }
]

@Component({
    selector: "ig-users-list",
    templateUrl: './user-list.component.html',
    styleUrl: "./user-list.component.scss",
})
export class UserListComponent {
    public dataSource = new MatTableDataSource<User>();
    public headers = ['correlationId', 'displayName', 'email'];
    constructor(){
        this.dataSource.data = users;
    }
}