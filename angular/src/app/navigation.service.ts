import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(private router: Router){}

    public navigate(url: string[], isRelative: boolean = false){
        let urlArray: string[] = [];
        if (isRelative) {
            urlArray.push(this.router.url);
            url.forEach((x) => urlArray.push(x));
            this.router.navigate(urlArray);
        } else {
            url.forEach((x) => urlArray.push(x));
            this.router.navigate(url);
        }
    }
}