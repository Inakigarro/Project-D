import { Component, OnInit } from "@angular/core";
import { User } from "../../shared";
import { MatTableDataSource } from "@angular/material/table";
import { Apollo } from "apollo-angular";
import { UsersQuery } from "../../domain/graphql/queries/users-query";

const users : User[] = [
    {
        correlationId: '1',
        displayName: 'Iñaki Garro',
        email: 'igarro@email.com',
    },
    {
        correlationId: '2',
        displayName: 'Lucila Almada',
        email: 'lalmada@email.com',
    }
]

@Component({
    selector: "ig-users-list",
    templateUrl: './user-list.component.html',
    styleUrl: "./user-list.component.scss",
})
export class UserListComponent implements OnInit {
    public dataSource = new MatTableDataSource<User>();
    public headers = ['displayName', 'email'];
    constructor(private usersQuery: UsersQuery){}

    public ngOnInit(): void {
        this.usersQuery.watch().valueChanges.subscribe(({data, loading}) => {
            this.dataSource.data = data.users
        })
    }
}