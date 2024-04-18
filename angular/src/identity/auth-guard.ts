import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { IdentityService } from "./identity.service";
import { map } from "rxjs";

export const AuthGuard : CanActivateFn = (route, state) => {
    const identityService = inject(IdentityService);
    const router = inject(Router);

    return identityService.composeToken.pipe(
        map(token => {
            if(!token.startsWith('Bearer')) {
                router.navigate(['identity', 'login']);
                return false;
            }
            return true
        })
    )
}