import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getToken } from '../identity/domain/state/identity.selectors';
import { filter } from 'rxjs';

@Component({
  selector: 'ig-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public isLoggedIn:boolean = false;
  constructor(private readonly store: Store){
    this.store.select(getToken)
      .pipe(
        filter(x => !!x)
      ).subscribe(
        token => token.startsWith('Bearer') ? this.isLoggedIn = true : this.isLoggedIn = false
      );
  }
}
