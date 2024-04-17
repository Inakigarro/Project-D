import { Component } from "@angular/core";
import { Store, createAction } from "@ngrx/store";
import { userLogOutRequested } from "../../identity/domain/state/identity.actions";

const toggleMenu = createAction(
  '[Toolbar] Toggle Menu'
)

@Component({
    selector: 'ig-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
    constructor(private store: Store){}

    toggleMenu(){
      this.store.dispatch(toggleMenu())
    }

    toggleTheme(){
        if (document.body.classList.contains('dark-theme')) {
          document.body.classList.remove('dark-theme');
          document.body.classList.add('light-theme');
        } else {
          document.body.classList.remove('light-theme');
          document.body.classList.add('dark-theme');
        }
      }
    
      logout() {
        this.store.dispatch(userLogOutRequested());
      }
}