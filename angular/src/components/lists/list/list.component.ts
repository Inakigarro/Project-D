import { Component, Inject, InjectionToken, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FormButton } from "../../buttons";
import { Observable, filter, map } from "rxjs";
import { Store } from "@ngrx/store";
import { editRowButtonClicked } from "./state/list.actions";

@Component({
    selector: 'ig-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class ListComponent<TItem> implements OnInit {
    @Input()
    public listId = 'list';

    @Input()
    public listTitle?: string;

    @Input()
    public listHeaders: (string & keyof TItem | 'buttons')[];

    @Input()
    public listData: Observable<TItem[]>;

    public dataSource = new MatTableDataSource<TItem>();

    constructor(public store: Store){}

    public ngOnInit() {
        this.listData.pipe(
            filter(x => !!x),
            map(data => this.dataSource.data = data)
        ).subscribe();
    }

    public humanizeLabel(label: string) {
        let result = label.replace(/([a-z])([A-Z])/g, '$1 $2')
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    public onEditButtonClicked(rowId: string) {
        this.store.dispatch(editRowButtonClicked({listId: this.listId, rowId}))
    }
}