import { Component } from "@angular/core";

@Component({
    selector: 'ig-identity',
    template: `
        <div class="ig-identity">
            <router-outlet></router-outlet>
        </div>`,
    styles: `
        .ig-identity {
            display: block;
            height: auto;
        }`
})
export class IdentityRoutingComponent {}