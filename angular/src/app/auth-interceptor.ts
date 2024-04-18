import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { getToken } from "../identity/domain/state/identity.selectors";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private readonly store: Store){}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        
        let result: Observable<HttpEvent<any>> = of();
        this.store.select(getToken).subscribe(
            token => {
                if (token.startsWith('Bearer')) {
                    const cloned = req.clone({
                        headers: req.headers.set("Authorization",
                            token)
                    });
        
                    result = next.handle(cloned);
                }
                else {
                    result = next.handle(req);
                }
            }
        );

        return result;
    }
}