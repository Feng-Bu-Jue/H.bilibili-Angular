import { Type } from '@angular/core';

export interface TypeDecorator {
    /**
     * Invoke as ES7 decorator.
     */
    <T extends Type<any>>(type: T): T;

    // Make TypeDecorator assignable to built-in ParameterDecorator type.
    // ParameterDecorator is declared in lib.d.ts as a `declare type`
    // so we cannot declare this interface as a subtype.
    // see https://github.com/angular/angular/issues/3379#issuecomment-126169417
    (target: Object, propertyKey?: string | symbol, parameterIndex?: number): void;
}

export const ANNOTATIONS = '__annotations__';
export const PARAMETERS = '__parameters__';
export const PROP_METADATA = '__prop__metadata__';

/**
 * @suppress {globalThis}
 */
export function makeDecorator<T>(
    name: string, props?: (...args: any[]) => any, parentClass?: any,
    additionalProcessing?: (type: Type<T>) => void,
    typeFn?: (type: Type<T>, ...args: any[]) => void): { new(...args: any[]): any; (...args: any[]): any; (...args: any[]): (cls: any) => any; } {
    const metaCtor = makeMetadataCtor(props);

    function DecoratorFactory(...args: any[]): (cls: Type<T>) => any {
        if (this instanceof DecoratorFactory) {
            metaCtor.call(this, ...args);
            return this;
        }


        const annotationInstance = new (DecoratorFactory as any)(...args);
        return function TypeDecorator(cls: Type<T>) {
            if (typeFn) typeFn(cls, ...args);
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
                (cls as any)[ANNOTATIONS] :
                Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
            annotations.push(annotationInstance);


            if (additionalProcessing) additionalProcessing(cls);

            return cls;
        };
    }

    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }

    DecoratorFactory.prototype.metadataName = name;
    (DecoratorFactory as any).annotationCls = DecoratorFactory;
    return DecoratorFactory as any;
}

function makeMetadataCtor(props?: (...args: any[]) => any): any {
    return function ctor(...args: any[]) {
        if (props) {
            const values = props(...args);

            for (const propName in values) {
                this[propName] = values[propName];
            }
        }
    };
}

export function makeParamDecorator(
    name: string, props?: (...args: any[]) => any, parentClass?: any): any {
    const metaCtor = makeMetadataCtor(props);
    function ParamDecoratorFactory(...args: any[]): any {
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        const annotationInstance = new (<any>ParamDecoratorFactory)(...args);

        (<any>ParamDecorator).annotation = annotationInstance;
        return ParamDecorator;

        function ParamDecorator(cls: any, unusedKey: any, index: number): any {
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            const parameters = cls.hasOwnProperty(PARAMETERS) ?
                (cls as any)[PARAMETERS] :
                Object.defineProperty(cls, PARAMETERS, { value: [] })[PARAMETERS];

            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }

            (parameters[index] = parameters[index] || []).push(annotationInstance);
            return cls;
        }
    }
    if (parentClass) {
        ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.metadataName = name;
    (<any>ParamDecoratorFactory).annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}

export function makePropDecorator(
    name: string, props?: (...args: any[]) => any, parentClass?: any,
    additionalProcessing?: (target: any, name: string, ...args: any[]) => void): any {
    const metaCtor = makeMetadataCtor(props);

    function PropDecoratorFactory(...args: any[]): any {
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }

        const decoratorInstance = new (<any>PropDecoratorFactory)(...args);

        function PropDecorator(target: any, name: string) {
            const constructor = target.constructor;
            // Use of Object.defineProperty is important since it creates non-enumerable property which
            // prevents the property is copied during subclassing.
            const meta = constructor.hasOwnProperty(PROP_METADATA) ?
                (constructor as any)[PROP_METADATA] :
                Object.defineProperty(constructor, PROP_METADATA, { value: {} })[PROP_METADATA];
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);

            if (additionalProcessing) additionalProcessing(target, name, ...args);
        }

        return PropDecorator;
    }

    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }

    PropDecoratorFactory.prototype.metadataName = name;
    (<any>PropDecoratorFactory).annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}

export class AnnotationReflector {
    public static GetPropAnnotation(target: any, prop: string, annotation: string) {
        const constructor = target.constructor;
        var meta = constructor[PROP_METADATA];
        if (meta) {
            var annotations: Array<any> = meta[prop];
            if (annotations) {
                return annotations.find(x => x.metadataName == annotation);
            }
        }
    }
}

export function ProxyFactory<T extends object>(target: T): any {
    let handler: ProxyHandler<T> = {
        get(target: T, p: PropertyKey) {
            let method = target[p];
            if (typeof method != "function")
                return;

            //return HttpClientMethodPorxy(target, p);
        }
    }
    return new Proxy<T>(target, {});
}

export function HttpClientMethodPorxy(target: any, p: PropertyKey) {
    /*
    let type = Reflect.getMetadata('design:type', target, p)
    let paramtypes = Reflect.getMetadata('design:paramtypes', target, p)
    let returntype = Reflect.getMetadata('design:returntype', target, p)
    */
    let route = AnnotationReflector.GetPropAnnotation(target, <string>p, "Route");

}


export const RoutePrefix: RoutePrefixDecorator = makeDecorator("RoutePrefix", (prefix?: string) => ({ prefix }));
export interface RoutePrefixDecorator {
    (prefix?: string): TypeDecorator;
    new(prefix?: string): RoutePrefix;
}
export interface RoutePrefix {
    prefix?: string
}

export const AutoResolveApi: AutoResolveApiDecorator = makeDecorator("AutoResolveApi", (factoryKey?: string) => ({ factoryKey }));
export interface AutoResolveApiDecorator {
    (factoryKey?: string): TypeDecorator;
    new(factoryKey?: string): AutoResolveApi;
}
export interface AutoResolveApi {
    factoryKey?: string
}

export const Route: RouteDecorator = makePropDecorator("Route", (path?: string) => ({ path }));
export interface RouteDecorator {
    (path?: string): any;
    new(path?: string): any;
}

export interface Route {
    path?: string
}

export const HttpGet: RouteDecorator = makePropDecorator("HttpGet");
export interface HttpGetDecorator {
    (): any;
    new(): any;
}

@RoutePrefix("api.vc/link_draw/v2")
@AutoResolveApi("normal")
export class Foo {

    @Route("doc/list")
    @HttpGet()
    getList(name: string): string { return null };
}
