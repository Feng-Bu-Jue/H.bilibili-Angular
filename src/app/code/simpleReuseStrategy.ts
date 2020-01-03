import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class SimpleReuseStrategy implements RouteReuseStrategy {

    _cacheRouters: { [key: string]: any } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this._cacheRouters[route.routeConfig.path] = {
            snapshot: route,
            handle: handle
        };
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!this._cacheRouters[route.routeConfig.path];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig || !this._cacheRouters[route.routeConfig.path]) {
            return null
        }
        return this._cacheRouters[route.routeConfig.path].handle;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}


export class IonicRouteStrategy implements RouteReuseStrategy {

    shouldDetach(_route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    shouldAttach(_route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    store(_route: ActivatedRouteSnapshot, _detachedTree: DetachedRouteHandle): void {
        return;
    }

    retrieve(_route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return null;
    }

    shouldReuseRoute(
        future: ActivatedRouteSnapshot,
        curr: ActivatedRouteSnapshot
    ): boolean {
        if (future.routeConfig !== curr.routeConfig) {
            return false;
        }

        // checking router params
        const futureParams = future.params;
        const currentParams = curr.params;
        const keysA = Object.keys(futureParams);
        const keysB = Object.keys(currentParams);

        if (keysA.length !== keysB.length) {
            return false;
        }
        // Test for A's keys different from B.
        for (const key of keysA) {
            if (currentParams[key] !== futureParams[key]) {
                return false;
            }
        }

        return true;
    }
}