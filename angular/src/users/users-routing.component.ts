import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersGenericActions } from './domain/state/users.actions';

@Component({
  selector: 'ig-users',
  template: `<router-outlet></router-outlet>`,
})
export class UsersRoutingComponent {
  constructor(private store: Store){
    this.store.dispatch(UsersGenericActions.init());
  }
}