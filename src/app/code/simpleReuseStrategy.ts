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
        return this._cacheRouters[route.routeConfig.path].handle;
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}