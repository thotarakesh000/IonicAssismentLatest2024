import { inject } from '@angular/core'
import { StorageService } from "./storage.service"
import { Router } from '@angular/router';

export const CanActivate = async () => {
    const cache = inject(StorageService);
    const router = inject(Router);
    const isRegistered = await cache.getStorage("isRegistered");
    const mobile = await cache.getStorage("mobile");

    console.log("CanActivate isRegistered", isRegistered, " mobile ", mobile)
    if (isRegistered == "1") {
        return true;
    } else {
        router.navigate(['/register']);
        return false;
    }
}