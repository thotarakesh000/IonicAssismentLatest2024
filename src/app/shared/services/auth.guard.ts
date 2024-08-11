import { inject } from '@angular/core'
import { StorageService } from "./storage.service"
import { Router } from '@angular/router';

export const CanActivate = async () => {
    const cache = inject(StorageService);
    const router = inject(Router);

    console.log(await cache.getStorage("isRegistered"))
    if (await cache.getStorage("isRegistered")) {
        return true;
    } else {
        router.navigate(['/register']);
        return false;
    }
}