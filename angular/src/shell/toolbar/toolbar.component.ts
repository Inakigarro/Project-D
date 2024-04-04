import { Component } from "@angular/core";

@Component({
    selector: 'ig-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
    toggleTheme(){
        if (document.body.classList.contains('dark-theme')) {
          document.body.classList.remove('dark-theme');
          document.body.classList.add('light-theme');
        } else {
          document.body.classList.remove('light-theme');
          document.body.classList.add('dark-theme');
        }
      }
}